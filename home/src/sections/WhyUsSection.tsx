import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhyCard from '@/components/WhyCard';

gsap.registerPlugin(ScrollTrigger);

const whyCards = [
  {
    icon: '📖',
    titleAr: 'محتوى بالعربي والإنجليزي',
    titleEn: 'Content in Arabic & English',
    descAr: 'تقدر تتعلم بلغتك المفضلة بسهولة',
    descEn: 'Learn in your preferred language easily',
    gradientClass: 'wc1',
  },
  {
    icon: '💡',
    titleAr: 'محاضرات متعددة لكل شابتر',
    titleEn: 'Multiple Lectures per Chapter',
    descAr: 'كل شابتر فيه محاضرات كتير تغطي كل التفاصيل',
    descEn: 'Each chapter has many lectures covering every detail',
    gradientClass: 'wc2',
  },
  {
    icon: '🔒',
    titleAr: 'حساب آمن ومحمي',
    titleEn: 'Safe & Secure Account',
    descAr: 'بياناتك محمية بالكامل مع نظام تسجيل دخول موثوق',
    descEn: 'Your data is fully protected with a reliable login system',
    gradientClass: 'wc3',
  },
  {
    icon: '📱',
    titleAr: 'يشتغل على كل الأجهزة',
    titleEn: 'Works on All Devices',
    descAr: 'موبايل، تابلت، لاب توب — المنصة تتكيف معاك',
    descEn: 'Mobile, tablet, laptop — the platform adapts to you',
    gradientClass: 'wc4',
  },
];

const checklist = [
  {
    icon: '✅',
    titleAr: 'تصميم سهل ومريح',
    titleEn: 'Easy & Comfortable Design',
    descAr: 'الواجهة مصممة عشان تركز في المذاكرة مش في فهم الموقع.',
    descEn: 'The interface is designed for studying, not for figuring out the site.',
  },
  {
    icon: '🚀',
    titleAr: 'سريع ومتاح دايماً',
    titleEn: 'Fast & Always Available',
    descAr: 'المنصة شغالة ٢٤/٧ من أي جهاز وفي أي وقت.',
    descEn: 'The platform runs 24/7 from any device, anytime.',
  },
  {
    icon: '🎯',
    titleAr: 'محتوى هادف ومنظم',
    titleEn: 'Purposeful Organized Content',
    descAr: 'الحصص مرتبة وواضحة عشان تتابع تقدمك من غير تشتت.',
    descEn: 'Lessons are organized and clear so you track progress without distraction.',
  },
];

export default function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const leftEls = ref.current.querySelectorAll('.why-left-anim');
    const rightEls = ref.current.querySelectorAll('.why-right-anim');
    const isRTL = document.documentElement.dir === 'rtl';

    gsap.from(leftEls, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(rightEls, {
      x: isRTL ? 30 : -30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return (
    <section ref={ref} id="why" style={{ padding: '0 clamp(16px,6vw,88px) 90px' }}>
      <div
        className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
      >
        <div>
          <h2
            className="why-left-anim"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              color: 'var(--txt)',
              letterSpacing: '-0.04em',
              marginBottom: 14,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
            }}
            data-ar="ليه تختار <span style='color:var(--g2)'>kalawy</span>؟"
            data-en="Why choose <span style='color:var(--g2)'>kalawy</span>?"
            dangerouslySetInnerHTML={{ __html: 'ليه تختار <span style="color:var(--g2)">kalawy</span>؟' }}
          />
          <p
            className="why-left-anim"
            style={{
              color: 'var(--muted)',
              lineHeight: 1.85,
              fontWeight: 600,
              fontSize: '1rem',
              marginBottom: 28,
            }}
            data-ar="مش بس منصة، دي تجربة مذاكرة كاملة مصممة خصيصاً للطالب العربي. كل حاجة اتفكر فيها وصممت عشانك."
            data-en="Not just a platform — it's a full study experience designed for every student. Everything is built with you in mind."
          >
            مش بس منصة، دي تجربة مذاكرة كاملة مصممة خصيصاً للطالب العربي. كل حاجة اتفكر فيها وصممت عشانك.
          </p>
          <div className="flex flex-col gap-3.5">
            {checklist.map((item, i) => (
              <div key={i} className="why-left-anim flex items-start gap-3.5">
                <div
                  className="why-icon grid place-items-center shrink-0"
                  style={{
                    width: 42,
                    height: 42,
                    minWidth: 42,
                    borderRadius: 12,
                    background: 'rgba(0,230,136,0.1)',
                    border: '1px solid rgba(0,230,136,0.18)',
                    fontSize: '1.2rem',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--txt)', marginBottom: 3 }} data-ar={item.titleAr} data-en={item.titleEn}>{item.titleAr}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 600, lineHeight: 1.65 }} data-ar={item.descAr} data-en={item.descEn}>{item.descAr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {whyCards.map((card, i) => (
            <div key={i} className={`why-right-anim ${card.gradientClass}`}>
              <WhyCard
                  icon={<span>{card.icon}</span>}
                  titleAr={card.titleAr}
                  titleEn={card.titleEn}
                  descAr={card.descAr}
                  descEn={card.descEn}
                  gradientClass={card.gradientClass}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
