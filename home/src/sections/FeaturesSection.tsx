import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '📚',
    titleAr: 'شابترات منظمة',
    titleEn: 'Organized Chapters',
    descAr: 'كل حصة وشابتر بيظهر في كارت واضح ومرتب عشان تلاقي اللي بتدور عليه بسرعة.',
    descEn: 'Every lesson and chapter appears in a clear, organized card so you find what you need fast.',
  },
  {
    icon: '🌐',
    titleAr: 'عربي وإنجليزي',
    titleEn: 'Arabic & English',
    descAr: 'المنصة بتدعم اللغتين عربي وإنجليزي، تقدر تغير اللغة من زر واحد في الأعلى.',
    descEn: 'The platform supports both Arabic and English — switch instantly from the top bar.',
  },
  {
    icon: '🔔',
    titleAr: 'إشعارات فورية',
    titleEn: 'Instant Notifications',
    descAr: 'هتعرف على طول لو في حصة جديدة أو تحديث. لو مفيش إشعارات هيظهر: لا يوجد.',
    descEn: "Always know when there's a new lesson or update. No notifications? It simply says: Nothing.",
  },
];

export default function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.feat-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: gridRef });

  return (
    <section style={{ padding: '0 clamp(16px,6vw,88px) 90px' }}>
      <div className="max-w-[1240px] mx-auto">
        <SectionHeader
          titleAr="كل اللي محتاجه في مكان واحد"
          titleEn="Everything you need in one place"
          subtitleAr="منصة بسيطة وواضحة تخلي المذاكرة أسهل"
          subtitleEn="A simple, clear platform that makes studying easier"
        />
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f, i) => (
            <div key={i} className="feat-card">
              <FeatureCard {...f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
