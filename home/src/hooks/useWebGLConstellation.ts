import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_particleCount;
uniform float u_lineOpacity;
uniform float u_particleOpacity;
uniform float u_mouseRadius;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  vec2 a = hash2(i);
  vec2 b = hash2(i + vec2(1.0, 0.0));
  vec2 c = hash2(i + vec2(0.0, 1.0));
  vec2 d = hash2(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec2 particlePos(float idx, float t) {
  vec2 seed = vec2(idx * 1.2345, idx * 2.7182);
  vec2 base = hash2(seed) * u_res;
  vec2 drift = noise2(base * 0.001 + t * 0.0003) * 2.0 - 1.0;
  drift = fract(drift + 0.5) - 0.5;
  drift *= 60.0;
  float wave = sin(t * 0.0005 + idx * 0.1) * 15.0;
  float wave2 = cos(t * 0.0007 + idx * 0.07) * 10.0;
  return base + vec2(wave + drift.x, wave2 + drift.y);
}

float glowLine(vec2 uv, vec2 a, vec2 b, float t) {
  vec2 ab = b - a;
  float len2 = dot(ab, ab);
  vec2 ap = uv - a;
  float proj = clamp(dot(ap, ab) / len2, 0.0, 1.0);
  vec2 closest = a + ab * proj;
  float dist = length(uv - closest);
  float width = 0.5 + 0.3 * sin(t * 0.003 + length(a) * 0.01);
  float brightness = 0.4 + 0.2 * sin(t * 0.002 + hash(vec2(a.x, b.y)) * 6.28);
  float glow = exp(-dist * dist / (width * width * 2.0)) * brightness;
  return glow * (1.0 - proj * 0.3);
}

void main() {
  vec2 uv = gl_FragCoord.xy;
  float t = u_time;

  vec2 mouseOffset = vec2(0.0);
  float mouseInfluence = 0.0;
  if (u_mouse.x > 0.0) {
    mouseOffset = uv - u_mouse;
    float mouseDist = length(mouseOffset);
    mouseInfluence = exp(-mouseDist * mouseDist / (u_mouseRadius * u_mouseRadius * 2.0));
  }

  vec3 col = vec3(0.0);
  col += vec3(0.06, 0.02, 0.12);

  int particleCount = int(u_particleCount);
  float connectDist = 180.0;
  int nearbyCount = 0;
  float mouseDistMin = 9999.0;

  for (int i = 0; i < 100; i++) {
    if (i >= particleCount) break;
    float pIdx = float(i);
    vec2 p = particlePos(pIdx, t);
    vec2 toParticle = uv - p;
    if (u_mouse.x > 0.0) {
      toParticle += normalize(mouseOffset) * mouseInfluence * 30.0 * sin(t * 0.005 + pIdx);
      p = uv - toParticle;
    }
    float dist = length(toParticle);
    if (dist < mouseDistMin) mouseDistMin = dist;

    if (dist < 4.0) {
      float pointGlow = exp(-dist * dist / 8.0) * u_particleOpacity;
      col += vec3(0.0, 0.9, 0.53) * pointGlow * 0.6;
      nearbyCount++;
    }
    if (dist < 5.0) {
      float coreGlow = exp(-dist * dist / 4.0) * u_particleOpacity;
      col += vec3(1.0, 1.0, 1.0) * coreGlow * 0.3;
    }
    if (dist < connectDist && nearbyCount < 5) {
      for (int j = i + 1; j < 101; j++) {
        if (j >= particleCount) break;
        vec2 q = particlePos(float(j), t);
        float lineGlow = glowLine(uv, p, q, t);
        float dParticle = length(uv - p);
        float dOther = length(uv - q);
        if (dParticle < connectDist && dOther < connectDist) {
          vec3 lineCol = mix(vec3(0.0, 0.9, 0.53), vec3(1.0, 0.24, 0.81), hash(vec2(pIdx, float(j))));
          col += lineCol * lineGlow * u_lineOpacity * 0.5;
          nearbyCount++;
        }
      }
    }
  }

  if (u_mouse.x > 0.0) {
    float mouseGlow = exp(-mouseDistMin * mouseDistMin / 120.0) * mouseInfluence * 0.3;
    col += vec3(0.0, 0.9, 0.53) * mouseGlow;
  }

  float vig = 1.0 - smoothstep(0.3, 0.9, length((uv / u_res - 0.5) * 1.2));
  col *= 0.7 + 0.3 * vig;

  col = col / (1.0 + col * 0.3);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function useWebGLConstellation(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 700;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    geometry.setAttribute('a_pos', new THREE.BufferAttribute(positions, 2));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(-1, -1) },
        u_particleCount: { value: isMobile ? 25.0 : 50.0 },
        u_lineOpacity: { value: 0.8 },
        u_particleOpacity: { value: 0.9 },
        u_mouseRadius: { value: 150.0 },
      },
    });
    materialRef.current = material;

    scene.add(new THREE.Mesh(geometry, material));

    const animate = () => {
      material.uniforms.u_time.value = performance.now() * 0.001;
      material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.u_res.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = window.innerHeight - e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [canvasRef]);
}
