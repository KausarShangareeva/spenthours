import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ScrollColumn } from '../Marquee';
import { LEFT_COLS, RIGHT_COLS } from '../heroData';

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="hero-section" style={{ position: 'relative', minHeight: 775, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,255,255,0.72) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="hero-cols-left fade-left fade-top-bottom" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', gap: 8, paddingLeft: 12, paddingRight: 12, width: 'clamp(180px, 26vw, 330px)', zIndex: 1, overflow: 'hidden' }}>
        {LEFT_COLS.map((col, i) => (
          <ScrollColumn key={i} className={`hero-col hero-col-${i + 1}`} labels={col.labels} images={col.images} duration={col.dur} reverse={col.rev} />
        ))}
      </div>

      <div className="hero-cols-right fade-right fade-top-bottom" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex', gap: 4, paddingLeft: 8, paddingRight: 12, width: 'clamp(180px, 26vw, 330px)', zIndex: 1, overflow: 'hidden' }}>
        {RIGHT_COLS.map((col, i) => (
          <ScrollColumn key={i} className={`hero-col hero-col-${i + 1}`} labels={col.labels} images={col.images} isBook duration={col.dur} reverse={col.rev} />
        ))}
      </div>

      <div className="hero-center" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 620, padding: '40px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderRadius: 100, padding: '6px 18px 6px 8px', marginBottom: 28, boxShadow: '0 2px 12px rgba(124,58,237,0.1)' }}>
          <Logo size={24} />
          <span className="logo-wordmark" style={{ fontSize: 17 }}>Spent<em>Hours</em></span>
        </div>

        <h1 className="hero-h1" style={{ fontFamily: "var(--font-serif)", fontSize: 'clamp(28px, 4.2vw, 60px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 0 20px' }}>
          What Could Your Movie<br />Hours <em style={{ fontStyle: 'italic', color: 'var(--brand)' }}>Become?</em>
        </h1>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 400, lineHeight: 1.65, color: '#5b4a7a', margin: '0 0 36px', maxWidth: 420 }}>
          Отмечайте просмотренные фильмы и сериалы в один клик. Узнайте, сколько книг вы могли бы прочесть и каким дисциплинам обучиться, если бы инвестировали это время в себя.
        </p>

        <button className="hero-cta" onClick={onStart}>
          See what I could achieve
          <span className="hero-cta-arrow"><ArrowRight size={16} /></span>
        </button>

        <div className="hero-pills" style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="stat-pill">🎬 1,000+ movies &amp; shows</div>
          <div className="stat-pill">🔒 No sign-up required</div>
          <div className="stat-pill">⚡ Fills in under 30 seconds</div>
        </div>
      </div>
    </section>
  );
}
