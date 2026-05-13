import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const cols = ref.current.querySelectorAll('.footer-col');
    gsap.from(cols, {
      y: 40,
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

  const waIcon = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  return (
    <footer ref={ref} className="footer" style={{ background: '#07010f', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px clamp(16px,5vw,88px) 28px', color: 'rgba(255,255,255,0.65)' }}>
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-11">
        <style>{`
          .social-btn:hover {
            background: rgba(0,230,136,0.15);
            border-color: rgba(0,230,136,0.3);
          }
          .footer-col ul li a:hover {
            color: var(--g1);
          }
        `}</style>
        <div className="footer-col">
          <div className="footer-brand flex items-center gap-[11px] mb-4">
            <div className="mark">KW</div>
            <strong className="footer-logo" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
              kala<span style={{ color: 'var(--g1)', fontStyle: 'normal' }}>wy</span>
            </strong>
          </div>
          <p className="footer-desc" style={{ fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 600, maxWidth: 280 }} data-ar="منصة تعليمية مصممة عشان تخلي تجربة المذاكرة أسهل وأكثر تنظيماً لكل طالب." data-en="An educational platform designed to make studying easier and more organized for every student.">
            منصة تعليمية مصممة عشان تخلي تجربة المذاكرة أسهل وأكثر تنظيماً لكل طالب.
          </p>
          <div className="flex gap-2.5 mt-5">
            <a className="social-btn grid place-items-center no-underline transition-all" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '1rem' }} href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" title="WhatsApp">{waIcon}</a>
            <a className="social-btn grid place-items-center no-underline transition-all" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '1rem' }} href="https://t.me/kalawy" target="_blank" rel="noopener noreferrer" title="Telegram">✈️</a>
            <a className="social-btn grid place-items-center no-underline transition-all" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '1rem' }} href="mailto:support@kalawy.com" title="Email">📧</a>
          </div>
        </div>

        <div className="footer-col">
          <h4 style={{ fontSize: '0.93rem', fontWeight: 800, color: '#fff', marginBottom: 14 }} data-ar="روابط سريعة" data-en="Quick Links">روابط سريعة</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="/home/" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }} data-ar="الرئيسية" data-en="Home">الرئيسية</a></li>
            <li><a href="/login/" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }} data-ar="تسجيل الدخول" data-en="Login">تسجيل الدخول</a></li>
            <li><a href="/signup/" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }} data-ar="حساب جديد" data-en="Sign Up">حساب جديد</a></li>
            <li><a href="/dashboard/" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }} data-ar="لوحة التحكم" data-en="Dashboard">لوحة التحكم</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{ fontSize: '0.93rem', fontWeight: 800, color: '#fff', marginBottom: 14 }} data-ar="تواصل معنا" data-en="Contact Us">تواصل معنا</h4>
          <ul className="list-none flex flex-col gap-2">
            <li><a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }}>WhatsApp</a></li>
            <li><a href="mailto:support@kalawy.com" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }}>support@kalawy.com</a></li>
            <li><a href="https://t.me/kalawy" target="_blank" rel="noopener noreferrer" className="transition-colors no-underline font-semibold text-sm hover:text-[var(--g1)]" style={{ color: 'rgba(255,255,255,0.5)' }}>Telegram @kalawy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-6 flex items-center justify-between flex-wrap gap-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.84rem' }}>
        <span data-ar="© 2025 kalawy — جميع الحقوق محفوظة" data-en="© 2025 kalawy — All rights reserved">© 2025 kalawy — جميع الحقوق محفوظة</span>
        <span data-ar="صُنع بـ ❤️ للطلاب" data-en="Made with ❤️ for students">صُنع بـ ❤️ للطلاب</span>
      </div>
    </footer>
  );
}
