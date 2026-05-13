import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useWebGLConstellation } from '@/hooks/useWebGLConstellation';
import Badge from '@/components/Badge';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useWebGLConstellation(canvasRef);

  useGSAP(() => {
    if (!heroRef.current || !contentRef.current || !previewRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(canvasRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });

    const badge = contentRef.current.querySelector('.hero-badge');
    if (badge) tl.fromTo(badge, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.3);

    const h1 = contentRef.current.querySelector('.hero-h1');
    if (h1) {
      tl.fromTo(h1, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.5);
      const text = h1.getAttribute('data-ar') || '';
      const accentHTML = text.replace('منظم', '<span style="color:var(--g2)">منظم</span>');
      h1.innerHTML = '';
      
      const chars = accentHTML.split(/(<[^>]+>)/g).filter(Boolean);
      const symbols = '!<>-_\\/[]{}--=+*^?#________';
      
      const processText = () => {
        let displayHTML = '';
        let charIndex = 0;
        const totalChars = chars.filter(c => !c.startsWith('<')).join('').length;
        
        const interval = setInterval(() => {
          displayHTML = '';
          let currentIdx = 0;
          
          for (const part of chars) {
            if (part.startsWith('<')) {
              displayHTML += part;
              continue;
            }
            for (let i = 0; i < part.length; i++) {
              if (currentIdx < charIndex) {
                displayHTML += part[i];
              } else {
                displayHTML += symbols[Math.floor(Math.random() * symbols.length)];
              }
              currentIdx++;
            }
          }
          
          h1.innerHTML = displayHTML;
          charIndex++;
          
          if (charIndex > totalChars) {
            clearInterval(interval);
            h1.innerHTML = accentHTML;
          }
        }, 1500 / totalChars);
      };

      setTimeout(processText, 500);
    }

    const subtitle = contentRef.current.querySelector('.hero-sub');
    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.2);

    const ctas = contentRef.current.querySelectorAll('.hero-cta');
    if (ctas.length) tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, 1.5);

    const isRTL = document.documentElement.dir === 'rtl';
    tl.fromTo(previewRef.current, { opacity: 0, x: isRTL ? 40 : -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 1.0);

    previewRef.current.style.animation = 'float-card 4s ease-in-out infinite';
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ padding: '96px clamp(16px,6vw,88px) 80px', minHeight: '100vh' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            right: '-8%',
            top: '-20%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(0,230,136,.14), transparent 65%)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '-5%',
            bottom: '-10%',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(255,62,207,.09), transparent 65%)',
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        }}
      />

      <div
        className="relative z-10 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-13 items-center"
      >
        <div ref={contentRef}>
          <div className="hero-badge">
            <Badge />
          </div>
          <h1
            className="hero-h1"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: 20,
              color: 'var(--txt)',
              fontFamily: 'var(--font-display)',
              minHeight: '1.2em',
            }}
            data-ar="ذاكر حصصك بشكل منظم وسهل"
            data-en="Study your lessons in a clean way"
          >
            ذاكر حصصك بشكل <span style={{ color: 'var(--g2)' }}>منظم</span> وسهل
          </h1>
          <p
            className="hero-sub"
            style={{
              fontSize: '1.08rem',
              color: 'var(--muted)',
              lineHeight: 1.85,
              maxWidth: 580,
              fontWeight: 600,
            }}
            data-ar="ادخل بحسابك أو اعمل حساب جديد عشان تبدأ تشوف الشابترات والحصص بنفس الشكل الجديد."
            data-en="Sign in or create a new account to start viewing chapters and lessons with the new design."
          >
            ادخل بحسابك أو اعمل حساب جديد عشان تبدأ تشوف الشابترات والحصص بنفس الشكل الجديد.
          </p>
          <div className="flex gap-3 flex-wrap mt-8">
            <a
              href="/login/"
              className="hero-cta no-underline inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                border: 'none',
                borderRadius: 14,
                padding: '13px 22px',
                fontWeight: 800,
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, var(--p2), var(--p3))',
                color: '#fff',
                boxShadow: '0 12px 32px rgba(15,5,37,0.22)',
              }}
              data-ar="تسجيل الدخول"
              data-en="Sign In"
            >
              تسجيل الدخول
            </a>
            <a
              href="/signup/"
              className="hero-cta no-underline inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                borderRadius: 14,
                padding: '13px 22px',
                fontWeight: 800,
                fontSize: '0.95rem',
                background: 'transparent',
                color: 'var(--g2)',
                border: '1.5px solid rgba(0,230,136,0.35)',
              }}
              data-ar="إنشاء حساب"
              data-en="Create Account"
            >
              إنشاء حساب
            </a>
            <a
              href="/dashboard/"
              className="hero-cta no-underline inline-flex items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                borderRadius: 14,
                padding: '13px 22px',
                fontWeight: 800,
                fontSize: '0.95rem',
                background: 'transparent',
                color: 'var(--g2)',
                border: '1.5px solid rgba(0,230,136,0.35)',
              }}
              data-ar="لو داخل قبل كده"
              data-en="Go to Dashboard"
            >
              لو داخل قبل كده
            </a>
          </div>
        </div>

        <div
          ref={previewRef}
          className="preview-wrap"
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(227,231,240,0.9)',
            borderRadius: 28,
            padding: 20,
            boxShadow: 'var(--sh)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="screen-top"
            style={{
              height: 50,
              background: 'linear-gradient(135deg, var(--p2), var(--p1))',
              borderRadius: '18px 18px 10px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              color: '#fff',
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)' }}>kalawy</span>
            <div className="flex gap-[5px]">
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>
          <div
            className="chapter-card"
            style={{
              background: '#f3f4fb',
              border: '1px solid #ecedf5',
              borderRadius: 16,
              padding: '22px 16px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: 'var(--p1)', marginBottom: 12, fontWeight: 900 }} data-ar="الفصل السادس" data-en="Chapter 6">الفصل السادس</h3>
            <div
              style={{
                height: 130,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #050816, #1830a5 54%, #ff236d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.7rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                margin: '0 auto 16px',
                maxWidth: 210,
                fontFamily: 'var(--font-display)',
              }}
            >
              Physics
            </div>
            <b style={{ display: 'block', fontSize: '1.1rem', color: 'var(--p1)', marginBottom: 4 }} data-ar="فيزياء — الفصل ٦" data-en="Physics — Chapter 6">فيزياء — الفصل ٦</b>
            <div style={{ color: '#888', fontWeight: 700, fontSize: '0.9rem' }} data-ar="12 محاضرات" data-en="12 Lectures">12 محاضرات</div>
            <div
              style={{
                marginTop: 12,
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 10,
                color: '#888',
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
              data-ar="🔔 لا توجد إشعارات جديدة"
              data-en="🔔 No new notifications"
            >
              🔔 لا توجد إشعارات جديدة
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
