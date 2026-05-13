import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { prefix: '+', value: 500, suffix: '', labelAr: 'طالب نشط', labelEn: 'Active Students' },
  { prefix: '+', value: 80, suffix: '', labelAr: 'شابتر ومحاضرة', labelEn: 'Chapters & Lectures' },
  { prefix: '', value: 4.9, suffix: '★', decimals: 1, labelAr: 'تقييم الطلاب', labelEn: 'Student Rating' },
  { prefix: '', value: 24, suffix: '/7', labelAr: 'متاح دايماً', labelEn: 'Always Available' },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const countersAnimated = useRef(false);

  useGSAP(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.stat-item');
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (countersAnimated.current) return;
        countersAnimated.current = true;

        stats.forEach((stat, i) => {
          const el = ref.current?.querySelector(`#stat-num-${i}`);
          if (!el) return;

          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: stat.value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              const decimals = stat.decimals || 0;
              const formatted = decimals > 0 ? proxy.val.toFixed(decimals) : Math.round(proxy.val).toString();
              el.textContent = stat.prefix + formatted + stat.suffix;
            },
          });
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--p1), var(--p2))',
        padding: '52px clamp(16px,6vw,88px)',
        marginBottom: 80,
      }}
    >
      <div
        ref={ref}
        className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
      >
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <h3
              style={{
                fontSize: '2.6rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.05em',
                fontFamily: 'var(--font-display)',
              }}
            >
              <span id={`stat-num-${i}`} style={{ color: 'var(--g1)' }}>{stat.prefix}{stat.decimals ? stat.value.toFixed(stat.decimals) : '0'}{stat.suffix}</span>
            </h3>
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontWeight: 700,
                fontSize: '0.9rem',
                marginTop: 4,
              }}
              data-ar={stat.labelAr}
              data-en={stat.labelEn}
            >
              {stat.labelAr}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
