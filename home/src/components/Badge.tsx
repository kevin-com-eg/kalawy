export default function Badge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full mb-5"
      style={{
        background: 'rgba(0,230,136,0.1)',
        border: '1px solid rgba(0,230,136,0.2)',
        color: '#00b86e',
        fontWeight: 800,
        fontSize: '0.84rem',
      }}
    >
      <span
        className="inline-block w-[7px] h-[7px] rounded-full bg-[#00e688]"
        style={{ animation: 'pulse-dot 1.8s ease-in-out infinite' }}
      />
      <span data-ar="منصة kalawy التعليمية" data-en="kalawy Learning Platform">
        منصة kalawy التعليمية
      </span>
    </div>
  );
}
