import { HOW_STEPS } from '../heroData';

export function HowItWorks() {
  return (
    <section className="section-pad" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, var(--page-bg) 0%, rgba(186,230,253,0.30) 100%)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--brand)', textTransform: 'uppercase', marginBottom: 12 }}>How it works</p>
        <h2 className="section-h2" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', textAlign: 'center', color: 'var(--ink)', margin: '0 0 8px', fontWeight: 400 }}>Three steps. No account.</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 48, fontSize: 16 }}>Your data stays in your browser.</p>
        <div className="section-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {HOW_STEPS.map(step => (
            <div key={step.num} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.9)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.12em', marginBottom: 14 }}>{step.num}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--ink)', marginBottom: 10, fontWeight: 400 }}>{step.title}</h3>
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
