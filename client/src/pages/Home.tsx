import { Logo } from '@/components/Logo';
import { Link } from 'wouter';
import { Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────
const MOVIE_POSTERS = [
  'https://image.tmdb.org/t/p/w200/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg',
  'https://image.tmdb.org/t/p/w200/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
  'https://image.tmdb.org/t/p/w200/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
  'https://image.tmdb.org/t/p/w200/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
  'https://image.tmdb.org/t/p/w200/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg',
  'https://image.tmdb.org/t/p/w200/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  'https://image.tmdb.org/t/p/w200/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
  'https://image.tmdb.org/t/p/w200/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
  'https://image.tmdb.org/t/p/w200/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
  'https://image.tmdb.org/t/p/w200/eDCblCfqFqJPpMnTnGxQxCFWYqJ.jpg',
  'https://image.tmdb.org/t/p/w200/uX7LXnsC7bZJZjn048UCOwkPXWJ.jpg',
  'https://image.tmdb.org/t/p/w200/plcZXvI310FkbwIptvd6rqk63LP.jpg',
  'https://image.tmdb.org/t/p/w200/hUJ0UvQ5tgE2Z9WpfuduVSdiCiU.jpg',
  'https://image.tmdb.org/t/p/w200/ug3ndicuPM1V07vhVFGLMsd4AZl.jpg',
  'https://image.tmdb.org/t/p/w200/3VAHfuNb6Z7UiW12iYKANSPBl8m.jpg',
  'https://image.tmdb.org/t/p/w200/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'https://image.tmdb.org/t/p/w200/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  'https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  'https://image.tmdb.org/t/p/w200/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
  'https://image.tmdb.org/t/p/w200/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg',
  'https://image.tmdb.org/t/p/w200/oKT4NNlw1etqoGeBPxAle0MXj4a.jpg',
  'https://image.tmdb.org/t/p/w200/q719jXXEzOoYaps6babgKnONONX.jpg',
  'https://image.tmdb.org/t/p/w200/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
  'https://image.tmdb.org/t/p/w200/oGyJoUqk5iBqVIBHEGMdBGTbPGH.jpg',
  'https://image.tmdb.org/t/p/w200/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
  'https://image.tmdb.org/t/p/w200/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
];

const BOOK_COVERS = [
  'https://covers.openlibrary.org/b/isbn/0374533555-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0735224293-M.jpg',
  'https://covers.openlibrary.org/b/isbn/1501156700-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0062316095-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0525559477-M.jpg',
  'https://covers.openlibrary.org/b/isbn/1612680194-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0316346624-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0679720200-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0385333498-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0374533555-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0735224293-M.jpg',
  'https://covers.openlibrary.org/b/isbn/1501156700-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0062316095-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0525559477-M.jpg',
  'https://covers.openlibrary.org/b/isbn/1612680194-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0316346624-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0679720200-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0385333498-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0374533555-M.jpg',
  'https://covers.openlibrary.org/b/isbn/0735224293-M.jpg',
  'https://covers.openlibrary.org/b/isbn/1501156700-M.jpg',
];

const MOVIE_LABELS = [
  '1.7h watched', '2.5h watched', '1.8h watched', '1.9h watched',
  '1.7h watched', '2.2h watched', '1.6h watched', '2h watched',
  '2.5h watched', '3h watched', '2.1h watched', '3h watched',
  '2.5h watched', '2.6h watched', '1.4h watched', '2.5h watched',
  '3.4h watched', '3h watched', '3h watched', '1.7h watched', '2.1h watched',
];

const BOOK_LABELS = [
  '5h read', '6h read', '20h read', '12h read', '8h read',
  '5h read', '7h read', '7h read', '6h read', '8h read',
  '15h read', '14h read', '8h read', '6h read', '7h read',
  '8h read', '8h read', '8h read', '9h read', '6h read', '10h read',
];

// ── Movie card ─────────────────────────────────────────────────────────────
function MovieCard({ label, imgSrc }: { label: string; imgSrc: string }) {
  return (
    <div style={{
      position: 'relative', flexShrink: 0, width: 80, height: 120,
      borderRadius: 10, overflow: 'hidden', background: '#111',
      boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
    }}>
      <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)',
        padding: '18px 6px 6px',
      }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'white', lineHeight: 1.2, margin: 0 }}>{label}</p>
      </div>
    </div>
  );
}

// ── 3D Book card ───────────────────────────────────────────────────────────
function Book3DCard({ label, imgSrc }: { label: string; imgSrc: string }) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer', padding: '4px 2px', margin: 0, display: 'grid', flexShrink: 0 }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', width: '90%', height: '96%', top: '1%', left: 10,
          border: '1px solid grey', borderRadius: '2px 6px 6px 2px', background: 'white',
          boxShadow: '10px 40px 40px -10px #00000030, inset -2px 0 0 grey, inset -3px 0 0 #dbdbdb, inset -4px 0 0 white, inset -5px 0 0 #dbdbdb, inset -6px 0 0 white, inset -7px 0 0 #dbdbdb, inset -8px 0 0 white, inset -9px 0 0 #dbdbdb',
        }} />
        <div
          style={{
            lineHeight: 0, position: 'relative', borderRadius: '2px 6px 6px 2px',
            boxShadow: '6px 6px 18px -2px rgba(0,0,0,0.2), 24px 28px 40px -6px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out',
            transform: 'perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94)',
            cursor: 'pointer', width: 72, height: 108,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1)';
            el.style.boxShadow = '6px 6px 12px -1px rgba(0,0,0,0.1), 20px 14px 16px -6px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94)';
            el.style.boxShadow = '6px 6px 18px -2px rgba(0,0,0,0.2), 24px 28px 40px -6px rgba(0,0,0,0.1)';
          }}
        >
          <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', display: 'block' }} loading="lazy" />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: '100%', marginLeft: 16, borderLeft: '2px solid rgba(0,0,0,0.10)', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)', transition: 'all 0.5s ease', zIndex: 5 }} />
          <div style={{ width: '90%', height: '100%', position: 'absolute', borderRadius: 3, top: 0, right: 0, backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)', opacity: 0.1, zIndex: 4 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', padding: '14px 5px 5px', zIndex: 6 }}>
            <p style={{ fontSize: 8, fontWeight: 700, color: 'white', lineHeight: 1.2, margin: 0 }}>{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Vertical scroll column ─────────────────────────────────────────────────
function ScrollColumn({ labels, images, isBook = false, duration = 28, reverse = false }: {
  labels: string[]; images: string[]; isBook?: boolean; duration?: number; reverse?: boolean;
}) {
  const items = [...labels, ...labels];
  return (
    <div style={{ height: '100%' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        animation: `scrollV${reverse ? 'Rev' : ''} ${duration}s linear infinite`,
      }}>
        {items.map((label, i) =>
          isBook
            ? <Book3DCard key={i} label={label} imgSrc={images[i % images.length]} />
            : <MovieCard key={i} label={label} imgSrc={images[i % images.length]} />
        )}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Home() {
  const leftCols = [
    { labels: MOVIE_LABELS.slice(0, 7), images: MOVIE_POSTERS.slice(0, 7), dur: 20 },
    { labels: MOVIE_LABELS.slice(7, 14), images: MOVIE_POSTERS.slice(7, 14), dur: 26, rev: true },
    { labels: MOVIE_LABELS.slice(0, 7), images: MOVIE_POSTERS.slice(14, 21), dur: 23 },
  ];
  const rightCols = [
    { labels: BOOK_LABELS.slice(0, 7), images: BOOK_COVERS.slice(0, 7), dur: 22 },
    { labels: BOOK_LABELS.slice(7, 14), images: BOOK_COVERS.slice(7, 14), dur: 28, rev: true },
    { labels: BOOK_LABELS.slice(0, 7), images: BOOK_COVERS.slice(14, 21), dur: 25 },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f0e8ff' }}>
      <style>{`
        @keyframes scrollV    { 0% { transform:translateY(0) }    100% { transform:translateY(-50%) } }
        @keyframes scrollVRev { 0% { transform:translateY(-50%) } 100% { transform:translateY(0) } }
        body { overflow-x: hidden; }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a0a2e;
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 16px 32px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s cubic-bezier(0.23,1,0.32,1), background 0.18s;
          box-shadow: 0 4px 24px rgba(26,10,46,0.25), 0 1px 4px rgba(26,10,46,0.12);
        }
        .hero-cta:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 32px rgba(26,10,46,0.32), 0 2px 8px rgba(26,10,46,0.16);
          background: #2d1b4e;
        }
        .hero-cta:active { transform: scale(0.97); }
        .hero-cta-arrow {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: transform 0.18s cubic-bezier(0.23,1,0.32,1);
        }
        .hero-cta:hover .hero-cta-arrow { transform: translateX(3px); }

        .stat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 6px 14px 6px 8px;
          font-size: 12px; font-weight: 600; color: #3b1f6e;
        }
        .stat-pill-dot {
          width: 8px; height: 8px; border-radius: 50%;
        }

        .fade-left {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 18%, black 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 18%, black 100%);
        }
        .fade-right {
          -webkit-mask-image: linear-gradient(to left, transparent 0%, black 18%, black 100%);
          mask-image: linear-gradient(to left, transparent 0%, black 18%, black 100%);
        }
        .fade-top-bottom {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .logo-wordmark {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #1a0a2e;
          line-height: 1;
        }
        .logo-wordmark em {
          font-style: italic;
          color: #7c3aed;
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={32} />
          <span className="logo-wordmark">Spent<em>Hours</em></span>
        </div>
        <Link to="/app">
          <button className="hero-cta" style={{ padding: '10px 22px', fontSize: 13 }}>
            Open app
            <span className="hero-cta-arrow">
              <ArrowRight size={14} />
            </span>
          </button>
        </Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: 620,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Soft radial glow behind center text */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,255,255,0.72) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Left — movies */}
        <div
          className="fade-left fade-top-bottom"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            display: 'flex', gap: 10, paddingLeft: 8,
            width: 'clamp(180px, 26vw, 300px)',
            zIndex: 1,
          }}
        >
          {leftCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Right — 3D books */}
        <div
          className="fade-right fade-top-bottom"
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            display: 'flex', gap: 0,
            width: 'clamp(180px, 26vw, 300px)',
            zIndex: 1,
          }}
        >
          {rightCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} isBook duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Center content */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
          maxWidth: 560, padding: '0 24px',
        }}>
          {/* Eyebrow tag */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#7c3aed', textTransform: 'uppercase' }}>
              No account needed
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(42px, 5.5vw, 68px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#1a0a2e',
            margin: '0 0 20px',
          }}>
            See the true cost<br />
            <em style={{ fontStyle: 'italic', color: '#7c3aed' }}>of your screen time</em>
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.65,
            color: '#5b4a7a',
            margin: '0 0 36px',
            maxWidth: 400,
          }}>
            Mark watched titles in one click. SpentHours shows what those hours could have become — books read, skills learned, life gained back.
          </p>

          {/* CTA */}
          <Link to="/app">
            <button className="hero-cta">
              Start analyzing
              <span className="hero-cta-arrow">
                <ArrowRight size={16} />
              </span>
            </button>
          </Link>

          {/* Social proof pills */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="stat-pill">
              <span className="stat-pill-dot" style={{ background: '#a78bfa' }} />
              150+ titles in catalog
            </div>
            <div className="stat-pill">
              <span className="stat-pill-dot" style={{ background: '#34d399' }} />
              Saves to your browser
            </div>
            <div className="stat-pill">
              <span className="stat-pill-dot" style={{ background: '#fb923c' }} />
              Takes 30 seconds
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'rgba(219,234,254,0.35)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 12 }}>How it works</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 44px)', textAlign: 'center', color: '#1a0a2e', margin: '0 0 8px', fontWeight: 400 }}>Three steps. No account.</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 14 }}>Your data stays in your browser.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { num: '01', title: 'Mark what you watched', desc: 'Pick titles from a curated catalog. One click per movie. No accounts, no setup — everything saves to your browser.' },
              { num: '02', title: 'See the real number', desc: 'SpentHours converts runtimes into hours, days and weeks of life. The mirror is honest.' },
              { num: '03', title: 'Compare to what could be', desc: 'Those hours, translated into books read, courses finished, skills learned. Not shame — perspective.' },
            ].map(step => (
              <div key={step.num} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.9)' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.12em', marginBottom: 14 }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#1a0a2e', marginBottom: 10, fontWeight: 400 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'rgba(196,181,253,0.2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 12 }}>The real math</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 44px)', textAlign: 'center', color: '#1a0a2e', margin: '0 0 8px', fontWeight: 400 }}>What 200 movies actually costs</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 14 }}>The hours are real. So is the alternative.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { value: '200', label: 'Movies watched', sub: '≈ 18 full days of life', color: '#7c3aed' },
              { value: '12', label: 'Books unread', sub: 'the same hours, redirected', color: '#059669' },
              { value: '0', label: 'Accounts needed', sub: 'saved locally in your browser', color: '#ea580c' },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.9)' }}>
                <div style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 56, fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: '#1a0a2e', marginTop: 10, fontWeight: 400 }}>{stat.label}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(186,230,253,0.3)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 16 }}>Ready?</p>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 44px)', color: '#1a0a2e', margin: '0 0 12px', fontWeight: 400 }}>Ready to see your number?</h2>
        <p style={{ color: '#6b7280', marginBottom: 36, fontSize: 14 }}>Takes 30 seconds. No sign-up, no email — just you and the math.</p>
        <Link to="/app">
          <button className="hero-cta">
            Start analyzing wasted hours
            <span className="hero-cta-arrow"><ArrowRight size={16} /></span>
          </button>
        </Link>
      </section>

      {/* ── AUTHOR NOTE ───────────────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', background: 'linear-gradient(180deg, rgba(186,230,253,0.3) 0%, rgba(254,215,170,0.35) 100%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderRadius: 28, padding: '40px 40px', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 8px 40px rgba(26,10,46,0.07)' }}>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#1a0a2e', marginBottom: 20, fontWeight: 400 }}>A note from the author</h3>
            <div style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.75 }}>
              <p style={{ margin: '0 0 14px' }}>The hours we spend on screens are the quietest part of our week. We count steps, calories, sleep — but the biggest chunk of our time slips by without a number next to it. I wanted a small, honest mirror for that.</p>
              <p style={{ margin: '0 0 14px' }}>SpentHours is that mirror. You mark the movies and shows you've watched, and the app gently translates those hours into something tangible — books you could have read, skills you could have learned, days of life you could have lived a little differently. Not to shame anyone. Just to make the invisible visible.</p>
              <p style={{ margin: '0 0 14px' }}>I built this as a self-initiated project to learn, to design something I'd actually want to use, and to share a piece of myself with you. There are no accounts, no tracking, no dark patterns — your data lives in your browser, and that's it. Simple by choice.</p>
              <p style={{ margin: 0 }}>If SpentHours makes you pause for even one evening and pick up something you've been putting off, that's enough for me.</p>
            </div>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#1a0a2e', lineHeight: 1.3 }}>With love,<br />Kausar</div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1a0a2e' }}>Kausar S.</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Author of SpentHours</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { href: 'https://www.linkedin.com/in/kausar-s-312a8b27a/', bg: '#0077b5', icon: <Linkedin size={15} /> },
                    { href: 'https://github.com/KausarShangareeva', bg: '#1a0a2e', icon: <Github size={15} /> },
                    { href: 'mailto:kausyarsh@gmail.com', bg: '#ea4335', icon: <Mail size={15} /> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: s.bg, color: 'white', textDecoration: 'none', transition: 'opacity 0.15s', flexShrink: 0 }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
