import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactLink from '@/components/ContactLink';

gsap.registerPlugin(ScrollTrigger);

const waIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const leftEls = ref.current.querySelectorAll('.contact-left-anim');
    const form = ref.current.querySelector('.contact-form-box');

    gsap.from(leftEls, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (form) {
      gsap.from(form, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: ref });

  const sendMsg = () => {
    const name = (document.getElementById('f-name') as HTMLInputElement)?.value.trim();
    const email = (document.getElementById('f-email') as HTMLInputElement)?.value.trim();
    const msg = (document.getElementById('f-msg') as HTMLTextAreaElement)?.value.trim();
    const lang = document.documentElement.lang;
    if (!name || !email || !msg) {
      alert(lang === 'ar' ? 'من فضلك اكمل كل الحقول' : 'Please fill all fields');
      return;
    }
    const wa = `https://wa.me/201000000000?text=${encodeURIComponent(`الاسم: ${name}\nالإيميل: ${email}\nالرسالة: ${msg}`)}`;
    window.open(wa, '_blank');
  };

  return (
    <section ref={ref} id="contact" style={{ padding: '0 clamp(16px,6vw,88px) 90px' }}>
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <div>
          <h2
            className="contact-left-anim"
            style={{
              fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--txt)',
              letterSpacing: '-0.04em',
              marginBottom: 12,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.1,
            }}
            data-ar="تواصل <span style='color:var(--g2)'>معانا</span>"
            data-en="Get in <span style='color:var(--g2)'>Touch</span>"
            dangerouslySetInnerHTML={{ __html: 'تواصل <span style="color:var(--g2)">معانا</span>' }}
          />
          <p
            className="contact-left-anim"
            style={{
              color: 'var(--muted)',
              fontWeight: 600,
              lineHeight: 1.8,
              fontSize: '1rem',
              marginBottom: 32,
            }}
            data-ar="عندك سؤال أو مشكلة أو اقتراح؟ تواصل معانا بأي طريقة وهنرد عليك في أقرب وقت."
            data-en="Have a question, problem, or suggestion? Reach out any way and we'll get back to you ASAP."
          >
            عندك سؤال أو مشكلة أو اقتراح؟ تواصل معانا بأي طريقة وهنرد عليك في أقرب وقت.
          </p>
          <div className="flex flex-col gap-3">
            <div className="contact-left-anim">
              <ContactLink
                href="https://wa.me/201000000000"
                iconBg="linear-gradient(135deg, #25d366, #128c7e)"
                icon={waIcon}
                labelAr="واتساب"
                labelEn="WhatsApp"
                value="+20 100 000 0000"
                isExternal
              />
            </div>
            <div className="contact-left-anim">
              <ContactLink
                href="mailto:support@kalawy.com"
                iconBg="linear-gradient(135deg, #ea4335, #c5221f)"
                icon={<span>📧</span>}
                labelAr="البريد الإلكتروني"
                labelEn="Email"
                value="support@kalawy.com"
              />
            </div>
            <div className="contact-left-anim">
              <ContactLink
                href="https://t.me/kalawy"
                iconBg="linear-gradient(135deg, #2aabee, #1a7ac4)"
                icon={<span>✈️</span>}
                labelAr="تيليجرام"
                labelEn="Telegram"
                value="@kalawy"
                isExternal
              />
            </div>
          </div>
        </div>

        <div
          className="contact-form-box contact-box"
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 24,
            padding: 32,
            boxShadow: 'var(--sh)',
          }}
        >
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: 900,
              color: 'var(--txt)',
              marginBottom: 24,
            }}
            data-ar="ابعتلنا رسالة"
            data-en="Send us a message"
          >
            ابعتلنا رسالة
          </h3>
          <div className="form-group mb-4">
            <label
              className="block mb-[7px]"
              style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--txt)' }}
              data-ar="الاسم"
              data-en="Name"
            >
              الاسم
            </label>
            <input
              type="text"
              id="f-name"
              data-ph-ar="اكتب اسمك هنا..."
              data-ph-en="Your name..."
              placeholder="اكتب اسمك هنا..."
            />
          </div>
          <div className="form-group mb-4">
            <label
              className="block mb-[7px]"
              style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--txt)' }}
              data-ar="البريد الإلكتروني"
              data-en="Email"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="f-email"
              data-ph-ar="example@email.com"
              data-ph-en="example@email.com"
              placeholder="example@email.com"
            />
          </div>
          <div className="form-group mb-4">
            <label
              className="block mb-[7px]"
              style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--txt)' }}
              data-ar="الرسالة"
              data-en="Message"
            >
              الرسالة
            </label>
            <textarea
              id="f-msg"
              data-ph-ar="اكتب رسالتك هنا..."
              data-ph-en="Write your message here..."
              placeholder="اكتب رسالتك هنا..."
              style={{ minHeight: 110 }}
            />
          </div>
          <button
            className="w-full cursor-pointer transition-all hover:-translate-y-0.5"
            type="button"
            onClick={sendMsg}
            style={{
              padding: 14,
              border: 'none',
              borderRadius: 13,
              background: 'linear-gradient(135deg, var(--p2), var(--p3))',
              color: '#fff',
              fontWeight: 900,
              fontSize: '1rem',
            }}
            data-ar="إرسال الرسالة ✉️"
            data-en="Send Message ✉️"
          >
            إرسال الرسالة ✉️
          </button>
        </div>
      </div>
    </section>
  );
}
