import { Logo } from '@/components/Logo';
import { Link } from 'wouter';
import { Linkedin, Github, Mail } from 'lucide-react';

// Movie poster images for scrolling cards (TMDB)
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

// Book covers (real books)
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
  '1.7h watched', '1.7h watched', '1.8h watched', '1.9h watched',
  '1.7h watched', '1.4h watched', '1.6h watched', '2h watched',
  '2.5h watched', '2.2h watched', '2.1h watched', '3h watched',
  '2.5h watched', '2.6h watched', '2.5h watched', '2.5h watched',
  '2.5h watched', '3h watched', '3h watched', '3.4h watched', '1.7h watched',
];

const BOOK_LABELS = [
  '5h read', '6h read', '20h read', '12h read', '8h read',
  '5h read', '7h read', '7h read', '6h read', '8h read',
  '15h read', '14h read', '8h read', '6h read', '7h read',
  '8h read', '8h read', '8h read', '9h read', '6h read', '10h read',
];

// ── Movie card (flat dark poster) ──────────────────────────────────────────
function MovieCard({ label, imgSrc }: { label: string; imgSrc: string }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden rounded-xl" style={{ width: 72, height: 108, background: '#111' }}>
      <img
        src={imgSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-1.5 pb-1.5 pt-4">
        <p className="text-[9px] font-bold text-white leading-tight">{label}</p>
      </div>
    </div>
  );
}

// ── 3D Book card ───────────────────────────────────────────────────────────
function Book3DCard({ label, imgSrc }: { label: string; imgSrc: string }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 86, height: 126 }}>
      {/* Pages / spine shadow behind the cover */}
      <div
        style={{
          position: 'absolute',
          width: '88%',
          height: '96%',
          top: '2%',
          left: 12,
          border: '1px solid #bbb',
          borderRadius: '2px 6px 6px 2px',
          background: 'white',
          boxShadow:
            '10px 40px 40px -10px #00000030, inset -2px 0 0 grey, inset -3px 0 0 #dbdbdb, inset -4px 0 0 white, inset -5px 0 0 #dbdbdb, inset -6px 0 0 white, inset -7px 0 0 #dbdbdb, inset -8px 0 0 white, inset -9px 0 0 #dbdbdb',
        }}
      />
      {/* Cover with 3D perspective tilt */}
      <div
        className="book-3d-cover"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '2px 5px 5px 2px',
          overflow: 'hidden',
          boxShadow: '6px 6px 18px -2px rgba(0,0,0,0.2), 24px 28px 40px -6px rgba(0,0,0,0.1)',
          transform: 'perspective(2000px) rotateY(-18deg) translateX(-10px) scaleX(0.93)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1)';
          el.style.boxShadow = '6px 6px 12px -1px rgba(0,0,0,0.1), 20px 14px 16px -6px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'perspective(2000px) rotateY(-18deg) translateX(-10px) scaleX(0.93)';
          el.style.boxShadow = '6px 6px 18px -2px rgba(0,0,0,0.2), 24px 28px 40px -6px rgba(0,0,0,0.1)';
        }}
      >
        <img
          src={imgSrc}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={e => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            if (img.parentElement) img.parentElement.style.background = '#2d1b69';
          }}
        />
        {/* Spine light effect */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 20, height: '100%',
          marginLeft: 16,
          borderLeft: '2px solid rgba(0,0,0,0.08)',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 5,
          transition: 'all 0.5s ease',
        }} />
        {/* Sheen */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '85%', height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)',
          opacity: 0.12, zIndex: 4,
        }} />
        {/* Label */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)',
          padding: '12px 4px 4px',
          zIndex: 6,
        }}>
          <p style={{ fontSize: 8, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{label}</p>
        </div>
      </div>
    </div>
  );
}

// ── Vertical scrolling column ──────────────────────────────────────────────
function ScrollColumn({
  labels, images, isBook = false, duration = 28, reverse = false,
}: {
  labels: string[]; images: string[]; isBook?: boolean;
  duration?: number; reverse?: boolean;
}) {
  const items = [...labels, ...labels];
  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
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

// ── Main component ─────────────────────────────────────────────────────────
export default function Home() {
  const leftCols = [
    { labels: MOVIE_LABELS.slice(0, 7), images: MOVIE_POSTERS.slice(0, 7), dur: 22 },
    { labels: MOVIE_LABELS.slice(7, 14), images: MOVIE_POSTERS.slice(7, 14), dur: 28, rev: true },
    { labels: MOVIE_LABELS.slice(0, 7), images: MOVIE_POSTERS.slice(14, 21), dur: 25 },
    { labels: MOVIE_LABELS.slice(7, 14), images: MOVIE_POSTERS.slice(0, 7), dur: 32, rev: true },
  ];
  const rightCols = [
    { labels: BOOK_LABELS.slice(0, 7), images: BOOK_COVERS.slice(0, 7), dur: 24 },
    { labels: BOOK_LABELS.slice(7, 14), images: BOOK_COVERS.slice(7, 14), dur: 30, rev: true },
    { labels: BOOK_LABELS.slice(0, 7), images: BOOK_COVERS.slice(14, 21), dur: 26 },
    { labels: BOOK_LABELS.slice(7, 14), images: BOOK_COVERS.slice(0, 7), dur: 35, rev: true },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #f5d0fe 0%, #e0d7ff 25%, #bfdbfe 55%, #fde8d8 80%, #fef3c7 100%)' }}>

      <style>{`
        @keyframes scrollV {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollVRev {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center gap-2 px-6 py-5">
        <Logo size={28} />
        <span className="font-display text-xl font-black tracking-tight">SpentHours</span>
      </header>

      {/* Hero */}
      <section className="relative" style={{ minHeight: 560 }}>
        {/* Left — movies */}
        <div className="absolute left-0 top-0 bottom-0 flex gap-2 px-2 overflow-hidden"
          style={{ width: 'clamp(160px, 28vw, 320px)', zIndex: 1 }}>
          {leftCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Right — 3D books */}
        <div className="absolute right-0 top-0 bottom-0 flex gap-2 px-2 overflow-hidden"
          style={{ width: 'clamp(160px, 28vw, 320px)', zIndex: 1 }}>
          {rightCols.map((col, i) => (
            <ScrollColumn key={i} labels={col.labels} images={col.images} isBook duration={col.dur} reverse={col.rev} />
          ))}
        </div>

        {/* Center */}
        <div className="relative mx-auto flex flex-col items-center justify-center text-center px-4 py-24"
          style={{ zIndex: 2, maxWidth: 520 }}>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight text-gray-900">
            See the true cost <br />
            <em>of your screen time</em>
          </h1>
          <p className="mt-5 text-base text-gray-700 max-w-sm leading-relaxed">
            Mark watched titles in one click. SpentHours shows what those hours could have become — books read, skills learned, life gained back.
          </p>
          <Link to="/app">
            <button className="mt-8 rounded-full border-2 border-gray-900 bg-white/80 px-8 py-3 text-sm font-bold text-gray-900 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md active:scale-95">
              Start analyzing →
            </button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4" style={{ background: 'rgba(219,234,254,0.35)' }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl text-center text-gray-900 mb-2">How it works</h2>
          <p className="text-center text-gray-600 mb-10 text-sm">Three steps. No account. Your data stays in your browser.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Mark what you watched', desc: 'Pick titles from a curated catalog. One click per movie. No accounts, no setup — everything saves to your browser.' },
              { num: '02', title: 'See the real number', desc: 'SpentHours converts runtimes into hours, days and weeks of life. The mirror is honest.' },
              { num: '03', title: 'Compare to what could be', desc: 'Those hours, translated into books read, courses finished, skills learned. Not shame — perspective.' },
            ].map(step => (
              <div key={step.num} className="rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                <div className="text-xs font-bold text-gray-400 mb-3">{step.num}</div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4" style={{ background: 'rgba(196,181,253,0.25)' }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl text-center text-gray-900 mb-10">What 200 movies actually costs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: '200', label: 'MOVIES WATCHED', sub: '≈ 18 full days of life' },
              { value: '12', label: 'BOOKS UNREAD', sub: 'the same hours, redirected' },
              { value: '0', label: 'ACCOUNTS NEEDED', sub: 'saved locally in your browser' },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl bg-white/80 p-8 text-center shadow-sm backdrop-blur-sm">
                <div className="font-display text-6xl font-black text-gray-900">{stat.value}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: 'rgba(186,230,253,0.35)' }}>
        <h2 className="font-serif text-4xl text-gray-900 mb-3">Ready to see your number?</h2>
        <p className="text-gray-600 mb-8 text-sm">Takes 30 seconds. No sign-up, no email — just you and the math.</p>
        <Link to="/app">
          <button className="rounded-full border-2 border-gray-900 bg-white/80 px-10 py-3 text-xs font-black uppercase tracking-widest text-gray-900 shadow-sm backdrop-blur-sm transition hover:bg-white hover:shadow-md active:scale-95">
            START ANALYZING WASTED HOURS →
          </button>
        </Link>
      </section>

      {/* Author note */}
      <section className="py-12 px-4" style={{ background: 'linear-gradient(180deg, rgba(186,230,253,0.35) 0%, rgba(254,215,170,0.4) 100%)' }}>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white/90 p-8 shadow-sm backdrop-blur-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4">A note from the author</h3>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>The hours we spend on screens are the quietest part of our week. We count steps, calories, sleep — but the biggest chunk of our time slips by without a number next to it. I wanted a small, honest mirror for that.</p>
              <p>SpentHours is that mirror. You mark the movies and shows you've watched, and the app gently translates those hours into something tangible — books you could have read, skills you could have learned, days of life you could have lived a little differently. Not to shame anyone. Just to make the invisible visible.</p>
              <p>I built this as a self-initiated project to learn, to design something I'd actually want to use, and to share a piece of myself with you. There are no accounts, no tracking, no dark patterns — your data lives in your browser, and that's it. Simple by choice.</p>
              <p>If SpentHours makes you pause for even one evening and pick up something you've been putting off, that's enough for me. I'd love to hear what you think, what you'd add, and what your number turned out to be.</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="font-hand text-2xl text-gray-800 leading-tight">With love,<br />Kausar</div>
              <div className="ml-auto flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-sm text-gray-900">Kausar S.</div>
                  <div className="text-xs text-gray-500">Author of SpentHours</div>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/kausar-s-312a8b27a/" target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700">
                    <Linkedin size={16} />
                  </a>
                  <a href="https://github.com/KausarShangareeva" target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-800">
                    <Github size={16} />
                  </a>
                  <a href="mailto:kausyarsh@gmail.com"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600">
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
