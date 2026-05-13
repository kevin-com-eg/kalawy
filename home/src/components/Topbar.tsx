import { useEffect, useRef, useState } from 'react';
import { setLang, getCurrentLang } from '@/hooks/useLanguage';

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (localStorage.getItem('kw-theme') === 'dark') {
      document.body.classList.add('dark');
      setIsDark(true);
    }

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const dark = document.body.classList.toggle('dark');
    setIsDark(dark);
    localStorage.setItem('kw-theme', dark ? 'dark' : 'light');
  };

  return (
    <header ref={navRef} className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <a className="flex items-center gap-[11px] no-underline" href="/" style={{ color: '#fff' }}>
        <div className="mark">KW</div>
        <strong
          className="flex items-center gap-0"
          style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}
        >
          kala<span style={{ color: 'var(--g1)', fontStyle: 'normal' }}>wy</span>
        </strong>
      </a>

      <nav className="nav hidden md:flex items-center gap-7">
        <a href="/home/" data-ar="الرئيسية" data-en="Home">الرئيسية</a>
        <a href="#why" data-ar="لماذا نحن" data-en="Why Us">لماذا نحن</a>
        <a href="#contact" data-ar="اتصل بنا" data-en="Contact">اتصل بنا</a>
        <a href="/login/" data-ar="دخول" data-en="Login">دخول</a>
        <a href="/signup/" data-ar="حساب جديد" data-en="Sign Up">حساب جديد</a>
        <span className="soon cursor-default" data-ar="ملازم قريباً" data-en="Notes soon">ملازم قريباً</span>
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          type="button"
          className="border rounded-full cursor-pointer transition-all"
          style={{
            borderColor: 'rgba(255,255,255,0.16)',
            background: 'rgba(255,255,255,0.07)',
            color: '#fff',
            padding: '8px 14px',
            fontSize: '1rem',
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <div
          className="flex rounded-full"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: 3,
          }}
        >
          <button
            type="button"
            data-lang="ar"
            className="lang-sw-btn border-none rounded-full cursor-pointer font-extrabold transition-all"
            style={{
              background: getCurrentLang() === 'ar' ? '#fff' : 'transparent',
              color: getCurrentLang() === 'ar' ? 'var(--p1)' : 'rgba(255,255,255,0.55)',
              padding: '6px 13px',
              fontSize: '0.82rem',
            }}
            onClick={() => setLang('ar')}
          >
            عربي
          </button>
          <button
            type="button"
            data-lang="en"
            className="lang-sw-btn border-none rounded-full cursor-pointer font-extrabold transition-all"
            style={{
              background: getCurrentLang() === 'en' ? '#fff' : 'transparent',
              color: getCurrentLang() === 'en' ? 'var(--p1)' : 'rgba(255,255,255,0.55)',
              padding: '6px 13px',
              fontSize: '0.82rem',
            }}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
