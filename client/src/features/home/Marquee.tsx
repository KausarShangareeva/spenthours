import { BOOK_COVERS } from './heroData';

// ── Small movie poster (left marquee) ──────────────────────────────────────
export function MoviePoster({ label, imgSrc }: { label: string; imgSrc: string }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: 100, height: 150, borderRadius: 10, overflow: 'hidden', background: '#1a1a2e', boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
      <img src={imgSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)', padding: '18px 6px 6px' }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: 'white', lineHeight: 1.2, margin: 0 }}>{label}</p>
      </div>
    </div>
  );
}

// ── 3D book (right marquee) — transform driven by JS hover, so styles stay inline ──
export function Book3D({ label, imgSrc }: { label: string; imgSrc: string }) {
  const rest = 'perspective(2000px) rotateY(-15deg) translateX(-10px) scaleX(0.94)';
  const hover = 'perspective(2000px) rotateY(0deg) translateX(0px) scaleX(1)';
  const restShadow = '6px 6px 18px -2px rgba(0,0,0,0.2), 24px 28px 40px -6px rgba(0,0,0,0.1)';
  const hoverShadow = '6px 6px 12px -1px rgba(0,0,0,0.1), 20px 14px 16px -6px rgba(0,0,0,0.1)';
  return (
    <div style={{ position: 'relative', cursor: 'pointer', padding: '4px 6px', margin: 0, display: 'grid', flexShrink: 0 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', width: '90%', height: '96%', top: '1%', left: 10, border: '1px solid grey', borderRadius: '2px 6px 6px 2px', background: 'white', boxShadow: '10px 40px 40px -10px #00000030, inset -2px 0 0 grey, inset -3px 0 0 #dbdbdb, inset -4px 0 0 white, inset -5px 0 0 #dbdbdb, inset -6px 0 0 white, inset -7px 0 0 #dbdbdb, inset -8px 0 0 white, inset -9px 0 0 #dbdbdb' }} />
        <div
          style={{ lineHeight: 0, position: 'relative', borderRadius: '2px 6px 6px 2px', boxShadow: restShadow, transition: 'all 0.3s ease-in-out', transform: rest, cursor: 'pointer', width: 90, height: 135 }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.transform = hover; el.style.boxShadow = hoverShadow; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.transform = rest; el.style.boxShadow = restShadow; }}
        >
          <img src={imgSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px 6px 6px 2px', display: 'block' }}
            onError={e => {
              const img = e.target as HTMLImageElement;
              const tried = img.dataset.tried ? parseInt(img.dataset.tried) : 0;
              const idx = BOOK_COVERS.findIndex(u => u === img.src);
              const next = BOOK_COVERS[(idx + 1 + tried) % BOOK_COVERS.length];
              if (tried < 5 && next && next !== img.src) { img.dataset.tried = String(tried + 1); img.src = next; }
              else {
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) { const c = ['#d4c5f9', '#c8f5d0', '#bfdbfe', '#fde68a', '#fce7f3', '#fed7aa']; parent.style.background = c[Math.floor(Math.random() * c.length)]; }
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

// ── Vertical scrolling column of posters or books ──────────────────────────
export function ScrollColumn({ labels, images, isBook = false, duration = 28, reverse = false, className = '' }: {
  labels: string[]; images: string[]; isBook?: boolean; duration?: number; reverse?: boolean; className?: string;
}) {
  const items = [...labels, ...labels];
  return (
    <div className={className} style={{ height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: `scrollV${reverse ? 'Rev' : ''} ${duration}s linear infinite` }}>
        {items.map((label, i) =>
          isBook
            ? <Book3D key={i} label={label} imgSrc={images[i % images.length]} />
            : <MoviePoster key={i} label={label} imgSrc={images[i % images.length]} />,
        )}
      </div>
    </div>
  );
}
