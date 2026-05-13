import type { ReactNode } from 'react';

interface Props {
  href: string;
  iconBg: string;
  icon: ReactNode;
  labelAr: string;
  labelEn: string;
  value: string;
  isExternal?: boolean;
}

export default function ContactLink({ href, iconBg, icon, labelAr, labelEn, value, isExternal }: Props) {
  return (
    <a
      className="c-link"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div
        className="grid place-items-center shrink-0"
        style={{
          width: 46,
          height: 46,
          minWidth: 46,
          borderRadius: 12,
          background: iconBg,
          color: '#fff',
          fontSize: '1.35rem',
        }}
      >
        {icon}
      </div>
      <div>
        <small
          className="block mb-px"
          style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '0.78rem' }}
          data-ar={labelAr}
          data-en={labelEn}
        >
          {labelAr}
        </small>
        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{value}</span>
      </div>
    </a>
  );
}
