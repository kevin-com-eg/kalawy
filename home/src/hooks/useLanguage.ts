import { useCallback } from 'react';

let currentLang = localStorage.getItem('kw-lang') || 'ar';

export function getCurrentLang() {
  return currentLang;
}

export function setLang(lg: string) {
  currentLang = lg;
  localStorage.setItem('kw-lang', lg);
  document.documentElement.lang = lg;
  document.documentElement.dir = lg === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-ar]').forEach((el) => {
    const html = lg === 'en' ? (el as HTMLElement).dataset.en : (el as HTMLElement).dataset.ar;
    if (html) (el as HTMLElement).innerHTML = html;
  });

  document.querySelectorAll('[data-ph-ar]').forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    input.placeholder = lg === 'en' ? input.dataset.phEn || '' : input.dataset.phAr || '';
  });

  document.querySelectorAll('.lang-sw-btn').forEach((b) => {
    b.classList.toggle('on', b.getAttribute('data-lang') === lg);
  });

  window.dispatchEvent(new CustomEvent('langchange', { detail: lg }));
}

export function useLanguage() {
  const init = useCallback(() => {
    setLang(currentLang);
  }, []);

  return { init, setLang, currentLang: getCurrentLang };
}
