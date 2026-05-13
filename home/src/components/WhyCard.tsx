import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  gradientClass: string;
}

export default function WhyCard({ icon, titleAr, titleEn, descAr, descEn, gradientClass }: Props) {
  return (
    <div className="why-card">
      <div
        className={`grid place-items-center shrink-0 ${gradientClass}`}
        style={{
          width: 50,
          height: 50,
          minWidth: 50,
          borderRadius: 14,
          fontSize: '1.4rem',
        }}
      >
        {icon}
      </div>
      <div>
        <h4
          style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: 'var(--txt)',
            marginBottom: 3,
          }}
          data-ar={titleAr}
          data-en={titleEn}
        >
          {titleAr}
        </h4>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--muted)',
            fontWeight: 600,
          }}
          data-ar={descAr}
          data-en={descEn}
        >
          {descAr}
        </p>
      </div>
    </div>
  );
}
