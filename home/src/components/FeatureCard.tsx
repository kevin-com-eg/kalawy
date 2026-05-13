interface Props {
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export default function FeatureCard({ icon, titleAr, titleEn, descAr, descEn }: Props) {
  return (
    <div className="card-glass">
      <div
        className="grid place-items-center mb-4"
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(0,230,136,.12), rgba(0,230,136,.04))',
          border: '1px solid rgba(0,230,136,.18)',
          fontSize: '1.5rem',
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: '1.08rem',
          fontWeight: 900,
          color: 'var(--txt)',
          marginBottom: 8,
        }}
        data-ar={titleAr}
        data-en={titleEn}
      >
        {titleAr}
      </h3>
      <p
        style={{
          color: 'var(--muted)',
          lineHeight: 1.7,
          fontWeight: 600,
          fontSize: '0.93rem',
        }}
        data-ar={descAr}
        data-en={descEn}
      >
        {descAr}
      </p>
    </div>
  );
}
