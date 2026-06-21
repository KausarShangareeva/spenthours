import { ArrowRight } from 'lucide-react';

export function CtaBanner({ onStart }: { onStart: () => void }) {
  return (
    <section className="section-pad" style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(186,230,253,0.3)' }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 16 }}>Ready?</p>
      <h2 className="section-h2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--ink)', margin: '0 0 12px', fontWeight: 400 }}>Ready to see your number?</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 36, fontSize: 16 }}>Takes 30 seconds. No sign-up, no email — just you and the math.</p>
      <button className="hero-cta" onClick={onStart}>
        Start analyzing wasted hours
        <span className="hero-cta-arrow"><ArrowRight size={16} /></span>
      </button>
    </section>
  );
}
