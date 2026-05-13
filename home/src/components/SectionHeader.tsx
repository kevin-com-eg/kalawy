import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
}

export default function SectionHeader({ titleAr, titleEn, subtitleAr, subtitleEn }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.sh-anim');
    gsap.from(els, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="text-center mb-14">
      <h2
        className="sh-anim"
        style={{
          fontSize: 'clamp(1.9rem, 4vw, 3rem)',
          fontWeight: 900,
          color: 'var(--txt)',
          letterSpacing: '-0.04em',
          marginBottom: 12,
          fontFamily: 'var(--font-display)',
          lineHeight: 1.1,
        }}
        data-ar={titleAr}
        data-en={titleEn}
        dangerouslySetInnerHTML={{ __html: titleAr }}
      />
      <p
        className="sh-anim"
        style={{
          color: 'var(--muted)',
          fontSize: '1rem',
          fontWeight: 600,
          maxWidth: 500,
          margin: '0 auto',
        }}
        data-ar={subtitleAr}
        data-en={subtitleEn}
      >
        {subtitleAr}
      </p>
      <div
        className="sh-anim mx-auto mt-4"
        style={{
          width: 60,
          height: 4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, var(--g1), var(--pk))',
        }}
      />
    </div>
  );
}
