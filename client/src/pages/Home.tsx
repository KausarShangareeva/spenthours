import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Link } from 'wouter';
import { Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { ProfileModal } from '@/components/ProfileModal';

// ── Book covers — Open Library large format (reliable IDs) ────
const C = (id: string) => `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
const BOOK_COVERS = [
  C('13290711'),  // Thinking Fast and Slow
  C('12539702'),  // Atomic Habits
  C('8315603'),   // Rich Dad Poor Dad
  C('7414780'),   // The Alchemist
  C('10021591'),  // Outliers
  C('10873292'),  // The Tipping Point
  C('8516506'),   // Man's Search for Meaning
  C('6404786'),   // Drive
  C('7438753'),   // Grit
  C('8739161'),   // Thinking Fast and Slow v2
  C('10521270'),  // Blink
  C('8775116'),   // How to Win Friends
  // Extra covers with TMDB as reliable fallback
  'https://image.tmdb.org/t/p/w200/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg',
  'https://image.tmdb.org/t/p/w200/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
  'https://image.tmdb.org/t/p/w200/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
  'https://image.tmdb.org/t/p/w200/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
  'https://image.tmdb.org/t/p/w200/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg',
  'https://image.tmdb.org/t/p/w200/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  'https://image.tmdb.org/t/p/w200/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
  'https://image.tmdb.org/t/p/w200/inVq3FRqcYIRl2la8iZikYYxFNR.jpg',
];

// ── Movie posters ─────────────────────────────────────────────────────────
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
  'https://image.tmdb.org/t/p/w200/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg',
  'https://image.tmdb.org/t/p/w200/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg',
  'https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  'https://image.tmdb.org/t/p/w200/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg',
  'https://image.tmdb.org/t/p/w200/oCOFIhCCCRKyAeGnFVCDFKwJVqS.jpg',
  'https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  'https://image.tmdb.org/t/p/w200/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
  'https://image.tmdb.org/t/p/w200/5VTN0pR8gcqV3EPUHHfMGnJYspN.jpg',
  'https://image.tmdb.org/t/p/w200/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  'https://image.tmdb.org/t/p/w200/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
  'https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  'https://image.tmdb.org/t/p/w200/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
];

const MOVIE_LABELS = [
  '1.7h watched','2.5h watched','1.8h watched','1.9h watched','1.7h watched',
  '2.2h watched','1.6h watched','2h watched','2.5h watched','3h watched',
  '2.1h watched','3h watched','2.5h watched','2.6h watched','1.4h watched',
  '2.5h watched','3.4h watched','3h watched','3h watched','1.7h watched',
  '2.1h watched','1.9h watched','2.8h watched','2.3h watched','1.5h watched',
  '2.7h watched','3.2h watched','1.8h watched','2.4h watched','2.9h watched',
];

const BOOK_LABELS = [
  '5h read','6h read','20h read','12h read','8h read','5h read','7h read',
  '7h read','6h read','8h read','15h read','14h read','8h read','6h read',
  '7h read','8h read','9h read','6h read','10h read','11h read','13h read',
  '9h read','7h read','8h read','6h read','10h read','12h read','5h read',
  '8h read','9h read',
];

const AVATAR_URL = '/manus-storage/Gemini_Generated_Image_wtfvk4wtfvk4wtfv(2)_6812a2cf.png';

// ── Movie card ─────────────────────────────────────────────────────────────
function MovieCard({ label, imgSrc, fallbacks = [] }: { label: string; imgSrc: string; fallbacks?: string[] }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const next = fallbacks.shift();
    if (next) { img.src = next; } else { img.style.opacity = '0'; }
  };
  return (
    <div style={{
      position: 'relative', flexShrink: 0, width: 100, height: 150,
      borderRadius: 10, overflow: 'hidden', background: '#1a1a2e',
      boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
    }}>
      <img
        src={imgSrc} alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="lazy"
        onError={handleError}
      />
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
    <div style={{ position: 'relative', cursor: 'pointer', padding: '4px 6px', margin: 0, display: 'grid', flexShrink: 0 }}>
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
            cursor: 'pointer', width: 90, height: 135,
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
          <img
            src={imgSrc} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', display: 'block' }}
            loading="lazy"
            onError={e => {
              const img = e.target as HTMLImageElement;
              const tried = img.dataset.tried ? parseInt(img.dataset.tried) : 0;
              const allCovers = BOOK_COVERS;
              const currentIdx = allCovers.findIndex(u => u === img.src);
              const nextIdx = (currentIdx + 1 + tried) % allCovers.length;
              const nextSrc = allCovers[nextIdx];
              if (tried < 5 && nextSrc && nextSrc !== img.src) {
                img.dataset.tried = String(tried + 1);
                img.src = nextSrc;
              } else {
                // Show coloured placeholder instead of blank
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) {
                  const colors = ['#d4c5f9','#c8f5d0','#bfdbfe','#fde68a','#fce7f3','#fed7aa'];
                  parent.style.background = colors[Math.floor(Math.random() * colors.length)];
                }
              }
            }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: '100%', marginLeft: 16, borderLeft: '2px solid rgba(0,0,0,0.10)', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)', zIndex: 5 }} />
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
  const [showProfile, setShowProfile] = useState(false);
  // Spread 100 book covers across 3 columns so no repeats in view
  const leftCols = [
    { labels: MOVIE_LABELS.slice(0, 10), images: MOVIE_POSTERS.slice(0, 10), dur: 20 },
    { labels: MOVIE_LABELS.slice(10, 20), images: MOVIE_POSTERS.slice(10, 20), dur: 26, rev: true },
    { labels: MOVIE_LABELS.slice(20, 30), images: MOVIE_POSTERS.slice(20, 30), dur: 23 },
  ];
  const rightCols = [
    { labels: BOOK_LABELS.slice(0, 10), images: BOOK_COVERS.slice(0, 4), dur: 22 },
    { labels: BOOK_LABELS.slice(10, 20), images: BOOK_COVERS.slice(4, 8), dur: 28, rev: true },
    { labels: BOOK_LABELS.slice(20, 30), images: BOOK_COVERS.slice(8, 12), dur: 25 },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f0e8ff' }}>
      <style>{`
        @keyframes scrollV    { 0% { transform:translateY(0) }    100% { transform:translateY(-50%) } }
        @keyframes scrollVRev { 0% { transform:translateY(-50%) } 100% { transform:translateY(0) } }
        @keyframes scrollH    { 0% { transform:translateX(0) }    100% { transform:translateX(-50%) } }
        @keyframes scrollHRev { 0% { transform:translateX(-50%) } 100% { transform:translateX(0) } }
        body { overflow-x: hidden; }

        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: #1a0a2e; color: #fff; border: none; border-radius: 100px;
          padding: 16px 32px; font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s cubic-bezier(0.23,1,0.32,1), background 0.18s;
          box-shadow: 0 4px 24px rgba(26,10,46,0.25), 0 1px 4px rgba(26,10,46,0.12);
        }
        .hero-cta:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px rgba(26,10,46,0.32); background: #2d1b4e; }
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
          background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(12px); border-radius: 100px;
          padding: 6px 14px 6px 8px; font-size: 13px; font-weight: 600; color: #3b1f6e;
        }
        .stat-pill-dot { width: 8px; height: 8px; border-radius: 50%; }

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
          font-family: 'Instrument Serif', serif; font-size: 22px; font-weight: 400;
          letter-spacing: -0.02em; color: #1a0a2e; line-height: 1;
        }
        .logo-wordmark em { font-style: italic; color: #7c3aed; }

        /* ── Responsive ─────────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero-cols-left, .hero-cols-right { display: none !important; }
          .hero-section { min-height: auto !important; padding: 0 !important; }
          .hero-center { padding: 28px 20px 28px !important; }
          .hero-h1 { font-size: 28px !important; white-space: normal !important; }
          .hero-pills { gap: 8px !important; }
          .stat-pill { font-size: 11px !important; padding: 5px 10px 5px 6px !important; }
          .section-grid-3 { grid-template-columns: 1fr !important; }
          .section-pad { padding: 56px 20px !important; }
          .nav-wrap { padding: 16px 20px !important; }
          .author-card { padding: 28px 20px !important; }
          .author-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .author-social-row { margin-left: 0 !important; }
          .hero-cta { padding: 14px 24px !important; font-size: 14px !important; }
          .mobile-scroll-row { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-scroll-row { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 30px !important; }
          .section-h2 { font-size: 26px !important; }
        }
      `}</style>



      {/* Mobile TOP scroll row — movies (above headline) */}
      <div className="mobile-scroll-row" style={{ overflow: 'hidden', padding: '0 0 16px' }}>
        <div style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'scrollH 22s linear infinite' }}>
          {[...MOVIE_POSTERS, ...MOVIE_POSTERS].map((src, i) => (
            <div key={i} style={{ flexShrink: 0, width: 72, height: 108, borderRadius: 10, overflow: 'hidden', background: '#111', boxShadow: '0 3px 10px rgba(0,0,0,0.25)' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ position: 'relative', minHeight: 775, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(255,255,255,0.72) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Left — movies */}
        <div className="hero-cols-left fade-left fade-top-bottom" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          display: 'flex', gap: 8, paddingLeft: 12, paddingRight: 12,
          width: 'clamp(180px, 26vw, 330px)', zIndex: 1, overflow: 'hidden',
        }}>
          {leftCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Right — 3D books */}
        <div className="hero-cols-right fade-right fade-top-bottom" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          display: 'flex', gap: 4, paddingLeft: 8, paddingRight: 12,
          width: 'clamp(180px, 26vw, 330px)', zIndex: 1, overflow: 'hidden',
        }}>
          {rightCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} isBook duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Center */}
        <div className="hero-center" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 620, padding: '40px 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderRadius: 100, padding: '6px 18px 6px 8px', marginBottom: 28, boxShadow: '0 2px 12px rgba(124,58,237,0.1)' }}>
            <Logo size={24} />
            <span className="logo-wordmark" style={{ fontSize: 17 }}>Spent<em>Hours</em></span>
          </div>

          <h1 className="hero-h1" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4.2vw, 60px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1a0a2e', margin: '0 0 20px' }}>
            What Could Your Movie<br />Hours <em style={{ fontStyle: 'italic', color: '#7c3aed' }}>Become?</em>
          </h1>

          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.65, color: '#5b4a7a', margin: '0 0 36px', maxWidth: 420 }}>
            Отмечайте просмотренные фильмы и сериалы в один клик. Узнайте, сколько книг вы могли бы прочесть и каким дисциплинам обучиться, если бы инвестировали это время в себя.
          </p>

          <button className="hero-cta" onClick={() => setShowProfile(true)}>
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



      {/* Mobile bottom scroll row — books */}
      <div className="mobile-scroll-row" style={{ overflow: 'hidden', padding: '0 0 24px' }}>
        <div style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'scrollHRev 26s linear infinite' }}>
          {[...BOOK_COVERS, ...BOOK_COVERS].map((src, i) => (
            <div key={i} style={{ position: 'relative', flexShrink: 0, width: 72, height: 108, borderRadius: 10, overflow: 'hidden', background: '#f5f0ff', boxShadow: '0 3px 10px rgba(0,0,0,0.15)' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ padding: '80px 24px', background: 'rgba(219,234,254,0.35)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 12 }}>How it works</p>
          <h2 className="section-h2" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 44px)', textAlign: 'center', color: '#1a0a2e', margin: '0 0 8px', fontWeight: 400 }}>Three steps. No account.</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 48, fontSize: 16 }}>Your data stays in your browser.</p>
          <div className="section-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { num: '01', title: 'Mark what you watched', desc: 'Pick titles from a curated catalog. One click per movie. No accounts, no setup — everything saves to your browser.' },
              { num: '02', title: 'See the real number', desc: 'SpentHours converts runtimes into hours, days and weeks of life. The mirror is honest.' },
              { num: '03', title: 'Compare to what could be', desc: 'Those hours, translated into books read, courses finished, skills learned. Not shame — perspective.' },
            ].map(step => (
              <div key={step.num} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.9)' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#c4b5fd', letterSpacing: '0.12em', marginBottom: 14 }}>{step.num}</div>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#1a0a2e', marginBottom: 10, fontWeight: 400 }}>{step.title}</h3>
                <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ padding: '80px 24px', textAlign: 'center', background: 'rgba(186,230,253,0.3)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#7c3aed', textTransform: 'uppercase', marginBottom: 16 }}>Ready?</p>
        <h2 className="section-h2" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 44px)', color: '#1a0a2e', margin: '0 0 12px', fontWeight: 400 }}>Ready to see your number?</h2>
        <p style={{ color: '#6b7280', marginBottom: 36, fontSize: 16 }}>Takes 30 seconds. No sign-up, no email — just you and the math.</p>
        <button className="hero-cta" onClick={() => setShowProfile(true)}>
          Start analyzing wasted hours
          <span className="hero-cta-arrow"><ArrowRight size={16} /></span>
        </button>
      </section>

      {/* ── AUTHOR NOTE ───────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ padding: '60px 24px', background: 'linear-gradient(180deg, rgba(186,230,253,0.3) 0%, rgba(254,215,170,0.35) 100%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="author-card" style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', borderRadius: 28, padding: '40px 40px', border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 8px 40px rgba(26,10,46,0.07)' }}>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#1a0a2e', marginBottom: 20, fontWeight: 400 }}>A note from the author</h3>
            <div style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.9 }}>
              <p style={{ margin: '0 0 16px' }}>
                The hours we spend on screens are{' '}
                <mark style={{ background: '#fde68a', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#92400e' }}>the quietest part of our week</mark>.
                {' '}We count steps, calories, sleep — but{' '}
                <span style={{ textDecoration: 'underline', textDecorationColor: '#a78bfa', textDecorationThickness: 2 }}>the biggest chunk of our time</span>{' '}
                slips by without a number next to it. I wanted a{' '}
                <mark style={{ background: '#bbf7d0', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#065f46' }}>small, honest mirror</mark>{' '}for that.
              </p>
              <p style={{ margin: '0 0 16px' }}>
                SpentHours is that mirror. You mark the movies and shows you’ve watched, and the app gently translates those hours into something tangible —{' '}
                <mark style={{ background: '#bfdbfe', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#1e40af' }}>books you could have read</mark>,{' '}
                <mark style={{ background: '#bfdbfe', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#1e40af' }}>skills you could have learned</mark>,{' '}
                <mark style={{ background: '#bfdbfe', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#1e40af' }}>days of life lived a little differently</mark>.
                {' '}Not to shame anyone. Just to{' '}
                <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: '#f87171', textDecorationThickness: 2, fontStyle: 'italic' }}>make the invisible visible</span>.
              </p>
              <p style={{ margin: '0 0 16px' }}>
                I built this as a self-initiated project to learn, to design something I’d actually want to use, and to share a piece of myself with you.
                {' '}There are{' '}
                <mark style={{ background: '#d1fae5', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#065f46' }}>no accounts, no tracking, no dark patterns</mark>{' '}
                — your data lives in your browser, and that’s it.{' '}
                <span style={{ fontWeight: 700, color: '#1a0a2e', textDecoration: 'underline', textDecorationColor: '#1a0a2e', textDecorationThickness: 2 }}>Simple by choice.</span>
              </p>
              <p style={{ margin: 0 }}>
                If SpentHours makes you{' '}
                <span style={{ textDecoration: 'underline', textDecorationStyle: 'dashed', textDecorationColor: '#a78bfa', textDecorationThickness: 2 }}>pause for even one evening</span>{' '}
                and pick up something you’ve been putting off,{' '}
                <mark style={{ background: '#fce7f3', padding: '1px 4px', borderRadius: 3, fontWeight: 600, color: '#9d174d' }}>that’s enough for me</mark>.
              </p>
            </div>

            <div className="author-bottom" style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: '#1a0a2e', lineHeight: 1.3 }}>
                With love,<br />Kausar
              </div>
              <div className="author-social-row" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Avatar LEFT of name */}
                <img
                  src={AVATAR_URL}
                  alt="Kausar S."
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(124,58,237,0.2)', flexShrink: 0 }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1a0a2e' }}>Kausar S.</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>Author of SpentHours</div>
                </div>
                {/* Social icons */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { href: 'https://www.linkedin.com/in/kausar-s-312a8b27a/', bg: '#0077b5', icon: <Linkedin size={15} /> },
                    { href: 'https://github.com/KausarShangareeva', bg: '#1a0a2e', icon: <Github size={15} /> },
                    { href: 'mailto:kausyarsh@gmail.com', bg: '#ea4335', icon: <Mail size={15} /> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: s.bg, color: 'white', textDecoration: 'none', flexShrink: 0, transition: 'opacity 0.15s' }}
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

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
}
