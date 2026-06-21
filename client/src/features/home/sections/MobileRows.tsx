import { Book3D } from '../Marquee';
import { MOVIE_POSTERS, BOOK_COVERS, BOOK_LABELS } from '../heroData';

export function MobileMovieRow() {
  return (
    <div className="mobile-scroll-row" style={{ overflow: 'hidden', padding: '0 0 16px' }}>
      <div style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'scrollH 22s linear infinite' }}>
        {[...MOVIE_POSTERS.slice(0, 20), ...MOVIE_POSTERS.slice(0, 20)].map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: 72, height: 108, borderRadius: 10, overflow: 'hidden', background: '#1a1a2e', boxShadow: '0 3px 10px rgba(0,0,0,0.25)' }}>
            <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileBookRow() {
  return (
    <div className="mobile-scroll-row" style={{ overflow: 'hidden', padding: '4px 0 24px' }}>
      <div style={{ display: 'flex', gap: 6, width: 'max-content', alignItems: 'flex-start', animation: 'scrollHRev 26s linear infinite' }}>
        {[...BOOK_COVERS, ...BOOK_COVERS].map((src, i) => (
          <Book3D key={i} label={BOOK_LABELS[i % BOOK_LABELS.length]} imgSrc={src} />
        ))}
      </div>
    </div>
  );
}
