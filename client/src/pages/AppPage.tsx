import { useState, useMemo, useCallback } from 'react';
import { Search, X, BookOpen, Clock4, Film, BarChart2, Check, Languages, Code2, Dumbbell, Plane, BookMarked, Shuffle, CheckCheck } from 'lucide-react';
import { Link } from 'wouter';
import { Logo } from '@/components/Logo';
import { useShelf } from '@/hooks/useShelf';
import { MOVIES, GENRES, TYPES, Movie, getPoster, formatRuntime } from '@/lib/moviesData';
import { toast } from 'sonner';

// ── Programming languages ─────────────────────────────────────────────────
const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const PROG_LANGS = [
  { name: 'HTML & CSS', hours: 80,   icon: `${CDN}/html5/html5-original.svg` },
  { name: 'Python',     hours: 200,  icon: `${CDN}/python/python-original.svg` },
  { name: 'JavaScript', hours: 400,  icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'SQL',        hours: 600,  icon: `${CDN}/postgresql/postgresql-original.svg` },
  { name: 'TypeScript', hours: 850,  icon: `${CDN}/typescript/typescript-original.svg` },
  { name: 'React',      hours: 1100, icon: `${CDN}/react/react-original.svg` },
];

function getLanguageLevel(h: number) {
  if (h >= 900) return 'B2 — interviews & work';
  if (h >= 400) return 'B1 — movies without subtitles';
  if (h >= 150) return 'A2 — simple conversations';
  if (h >= 50)  return 'A1 — confident first steps';
  return 'First words & greetings';
}

// ── Analytics Popup ───────────────────────────────────────────────────────
function AnalyticsPopup({ totalMinutes, onClose }: { totalMinutes: number; onClose: () => void }) {
  const h = Math.max(0, Math.round(totalMinutes / 60));
  const interests: string[] = JSON.parse(localStorage.getItem('spenthours_interests') || '[]');
  const show = (id: string) => interests.length === 0 || interests.includes(id);

  const cards = [
    show('books') && {
      emoji: '📚', label: 'Books read',
      value: Math.floor(h / 10),
      unit: 'books',
      hint: '≈ 10 hours per book',
      color: '#1e40af', bg: '#dbeafe',
      bar: Math.min(100, (h / 10) * 5),
    },
    show('english') && {
      emoji: '🇬🇧', label: 'English level',
      value: getLanguageLevel(h),
      unit: '',
      hint: 'Daily immersion equivalent',
      color: '#065f46', bg: '#d1fae5',
      bar: Math.min(100, (h / 900) * 100),
    },
    show('spanish') && {
      emoji: '🇪🇸', label: 'Spanish level',
      value: getLanguageLevel(Math.floor(h * 0.75)),
      unit: '',
      hint: 'Slightly slower than English',
      color: '#92400e', bg: '#fde68a',
      bar: Math.min(100, (h / 1200) * 100),
    },
    show('programming') && {
      emoji: '💻', label: 'Programming',
      value: (() => {
        const u = PROG_LANGS.filter(l => h >= l.hours);
        return u.length ? `${u.length} ${u.length === 1 ? 'language' : 'languages'}` : 'First steps';
      })(),
      unit: '',
      hint: (() => {
        const u = PROG_LANGS.filter(l => h >= l.hours);
        return u.length ? u.map(l => l.name).join(' · ') : 'Start with HTML & CSS';
      })(),
      chips: PROG_LANGS.filter(l => h >= l.hours).slice(0, 6).map(l => l.icon),
      color: '#4c1d95', bg: '#ede9fe',
      bar: Math.min(100, (h / 1400) * 100),
    },
    show('design') && {
      emoji: '🎨', label: 'UI/UX Design',
      value: h >= 500 ? 'Senior level' : h >= 200 ? 'Mid level' : h >= 80 ? 'Junior' : 'Beginner',
      unit: '',
      hint: h >= 200 ? 'Could work on real products' : 'Keep practising Figma',
      color: '#9d174d', bg: '#fce7f3',
      bar: Math.min(100, (h / 500) * 100),
    },
    show('fitness') && {
      emoji: '🏋️', label: 'Workouts',
      value: Math.floor(h),
      unit: 'sessions',
      hint: '≈ 1 hour each',
      color: '#065f46', bg: '#bbf7d0',
      bar: Math.min(100, (h / 365) * 100),
    },
    show('music') && {
      emoji: '🎸', label: 'Music practice',
      value: h >= 300 ? 'Intermediate' : h >= 100 ? 'Beginner+' : 'First chords',
      unit: '',
      hint: '≈ 10,000h to mastery',
      color: '#7c2d12', bg: '#fed7aa',
      bar: Math.min(100, (h / 10000) * 100),
    },
    {
      emoji: '✈️', label: 'Long-haul flights',
      value: Math.floor(h / 10),
      unit: 'flights',
      hint: '≈ 10 hours each',
      color: '#1e3a5f', bg: '#bfdbfe',
      bar: Math.min(100, (h / 100) * 100),
    },
  ].filter(Boolean) as any[];

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15,10,30,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #1a0a2e 0%, #0f172a 100%)',
          borderRadius: 28, maxWidth: 680, width: '100%',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 100px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 1 }}>
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ padding: '32px 32px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#a78bfa', textTransform: 'uppercase', marginBottom: 8 }}>Your time, translated</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 56, fontWeight: 900, color: 'white', lineHeight: 1 }}>{h.toLocaleString()}</span>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', fontFamily: "'Instrument Serif', serif" }}>hours on screen</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
            Here's what that time could have bought you — no shame, just perspective.
          </p>
        </div>

        {/* Cards grid — NO scroll */}
        <div style={{ padding: '24px 32px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18, padding: '18px 18px 14px',
              transition: 'background 0.15s',
            }}>
              {/* Icon + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {card.emoji}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', lineHeight: 1.2 }}>{card.label}</span>
              </div>
              {/* Value */}
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: 'white', lineHeight: 1.2, marginBottom: 4 }}>
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                {card.unit ? <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>{card.unit}</span> : null}
              </div>
              {/* Hint */}
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: card.bar !== undefined ? 10 : 0, lineHeight: 1.4 }}>{card.hint}</div>
              {/* Progress bar */}
              {card.bar !== undefined && (
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${card.bar}%`, background: card.color, borderRadius: 2, transition: 'width 0.6s ease' }} />
                </div>
              )}
              {/* Dev icons */}
              {card.chips && card.chips.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {card.chips.map((src: string, j: number) => <img key={j} src={src} alt="" style={{ width: 18, height: 18 }} />)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 32px 20px', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          💛 Movies are wonderful. Time is the one currency with no change back.
        </div>
      </div>
    </div>
  );
}

// ── Similar movies popup ──────────────────────────────────────────────────
function getSimilar(movie: Movie, all: Movie[], watched: Set<string>): Movie[] {
  const tags = new Set(movie.tags);
  return all
    .filter(m => m.id !== movie.id && m.kind === movie.kind && m.tags.some(t => tags.has(t)))
    .sort((a, b) => {
      const sa = a.tags.filter(t => tags.has(t)).length;
      const sb = b.tags.filter(t => tags.has(t)).length;
      return sb - sa;
    })
    .slice(0, 12);
}

function SimilarPopup({
  movie, allMovies, watchedIds, onToggle, onClose,
}: {
  movie: Movie;
  allMovies: Movie[];
  watchedIds: Set<string>;
  onToggle: (m: Movie) => void;
  onClose: () => void;
}) {
  const similar = useMemo(() => getSimilar(movie, allMovies, watchedIds), [movie, allMovies, watchedIds]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSel = (id: string) => setSelected(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const handleMarkAll = () => {
    similar.forEach(m => { if (!watchedIds.has(m.id)) onToggle(m); });
    toast.success(`Added ${similar.filter(m => !watchedIds.has(m.id)).length} movies to shelf`);
    onClose();
  };

  const handleMarkSelected = () => {
    Array.from(selected).forEach(id => {
      const m = similar.find(x => x.id === id);
      if (m && !watchedIds.has(id)) onToggle(m);
    });
    toast.success(`Added ${selected.size} movies to shelf`);
    onClose();
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15,10,30,0.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 24, maxWidth: 860, width: '100%',
          boxShadow: '0 32px 100px rgba(0,0,0,0.35)', position: 'relative',
          maxHeight: '92vh', display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={handleMarkAll}
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#e07b6a', color: 'white', border: 'none', borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >
            <CheckCheck size={15} />
            Mark all ({similar.length})
          </button>
          {selected.size > 0 && (
            <button
              onClick={handleMarkSelected}
              style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#1a0a2e', color: 'white', border: 'none', borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              <Check size={15} />
              Mark selected ({selected.size})
            </button>
          )}
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'white', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            <Shuffle size={14} />
            Suggest similar
          </button>
          <button onClick={onClose} style={{ marginLeft: 'auto', width: 36, height: 36, borderRadius: '50%', background: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            <X size={16} />
          </button>
        </div>

        {/* Title */}
        <div style={{ padding: '16px 24px 12px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#e07b6a', textTransform: 'uppercase', marginBottom: 4 }}>✨ YOU MIGHT HAVE ALSO WATCHED</p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, color: '#1a0a2e', margin: '0 0 4px' }}>
            Similar to "{movie.title}"
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: 0 }}>Tap any you recognise — they'll be added to your shelf.</p>
        </div>

        {/* Grid — NO scroll, all visible */}
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}
            className="similar-grid"
          >
            {similar.map(m => {
              const poster = getPoster(m.id);
              const isWatched = watchedIds.has(m.id);
              const isSel = selected.has(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleSel(m.id)}
                  style={{
                    position: 'relative', display: 'flex', flexDirection: 'column',
                    borderRadius: 12, overflow: 'hidden', border: 'none',
                    background: '#1a1a2e', cursor: 'pointer', textAlign: 'left',
                    outline: isWatched ? '3px solid #e07b6a' : isSel ? '3px solid #7c3aed' : 'none',
                    outlineOffset: 2,
                    transition: 'transform 0.12s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.03)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                  <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%' }}>
                    {poster ? (
                      <img src={poster} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy"
                        onError={e => { const img = e.target as HTMLImageElement; img.style.display = 'none'; if (img.parentElement) { img.parentElement.style.background = 'linear-gradient(135deg,#d4c5f9,#c0e8ff)'; img.parentElement.style.display = 'flex'; img.parentElement.style.alignItems = 'center'; img.parentElement.style.justifyContent = 'center'; img.parentElement.style.fontSize = '28px'; img.parentElement.textContent = m.emoji; } }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#d4c5f9,#c0e8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{m.emoji}</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.88) 0%,transparent 100%)', padding: '20px 6px 6px' }}>
                      <p style={{ fontSize: 10, fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.3 }}>{m.title}</p>
                    </div>
                    {(isWatched || isSel) && (
                      <div style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: isWatched ? '#e07b6a' : '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '5px 6px 7px' }}>
                    <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>{m.year} · {formatRuntime(m.runtime)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive grid style */}
        <style>{`
          @media (max-width: 600px) {
            .similar-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

// ── Movie Card ────────────────────────────────────────────────────────────
function MovieCard({ movie, watched, onClick }: { movie: Movie; watched: boolean; onClick: () => void }) {
  const poster = getPoster(movie.id);
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        borderRadius: 12, overflow: 'hidden', border: 'none',
        background: '#1a1a2e', cursor: 'pointer', textAlign: 'left',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        outline: watched ? '3px solid #e07b6a' : 'none',
        outlineOffset: 2,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
    >
      <div style={{ position: 'relative', aspectRatio: '2/3', width: '100%', overflow: 'hidden' }}>
        {poster ? (
          <img src={poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy"
            onError={e => { const img = e.target as HTMLImageElement; img.style.display = 'none'; const p = img.parentElement; if (p) { p.style.background = 'linear-gradient(135deg,#d4c5f9,#c0e8ff)'; p.style.display = 'flex'; p.style.alignItems = 'center'; p.style.justifyContent = 'center'; p.style.fontSize = '32px'; p.textContent = movie.emoji; } }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#d4c5f9,#c0e8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>{movie.emoji}</div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%)', padding: '24px 8px 8px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.3, wordBreak: 'break-word' }}>{movie.title}</p>
        </div>
        {watched && (
          <div style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%', background: '#e07b6a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={14} color="white" strokeWidth={3} />
          </div>
        )}
      </div>
      <div style={{ padding: '6px 8px 8px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#e5e7eb', margin: '0 0 2px', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.title}</p>
        <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>{movie.year} · {formatRuntime(movie.runtime)}</p>
      </div>
    </button>
  );
}

// ── Main App Page ─────────────────────────────────────────────────────────
type TabType = 'all' | 'watched';

export default function AppPage() {
  const { watchedIds, addToShelf, removeFromShelf, totalMinutes, count } = useShelf();
  const [tab, setTab] = useState<TabType>('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [similarMovie, setSimilarMovie] = useState<Movie | null>(null);

  const hours = Math.round(totalMinutes / 60);
  const days = (totalMinutes / 60 / 24).toFixed(1);

  const handleToggle = useCallback((movie: Movie) => {
    if (watchedIds.has(movie.id)) {
      removeFromShelf(movie.id);
    } else {
      addToShelf([{ movie_id: movie.id, title: movie.title, year: movie.year, runtime: movie.runtime, poster_url: getPoster(movie.id), kind: movie.kind }]);
      toast.success('Added to your shelf');
      setSimilarMovie(movie);
    }
  }, [watchedIds, addToShelf, removeFromShelf]);

  const filteredMovies = useMemo(() => {
    let list: Movie[] = tab === 'watched' ? MOVIES.filter(m => watchedIds.has(m.id)) : MOVIES;
    if (kindFilter !== 'all') list = list.filter(m => m.kind === kindFilter);
    if (genreFilter !== 'all') list = list.filter(m => m.tags.some(t => t.toLowerCase() === genreFilter.toLowerCase()));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m => m.title.toLowerCase().includes(q) || m.year.toString().includes(q));
    }
    return list;
  }, [tab, kindFilter, genreFilter, search, watchedIds]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fef3c7 0%, #fde8d8 40%, #fce7f3 100%)', fontFamily: "'Montserrat', sans-serif" }}>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12, padding: '10px 24px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo size={30} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: '#1a0a2e' }}>Spent<em style={{ fontStyle: 'italic', color: '#7c3aed' }}>Hours</em></span>
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <StatBadge icon={<Film size={14} />} label="WATCHED" value={`${count}`} bg="#c8f5d0" />
            <StatBadge icon={<Clock4 size={14} />} label="SPENT" value={`${hours}h`} bg="#c0e8ff" />
            <StatBadge icon={<BookOpen size={14} />} label="DAYS" value={days} bg="#d4c5f9" />
            <button
              onClick={() => setShowAnalytics(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff3b0', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 100, padding: '6px 14px', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', cursor: 'pointer', color: '#1a0a2e', textTransform: 'uppercase' }}
            >
              <BarChart2 size={14} />ANALYTICS
            </button>
          </div>
          <span />
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#1a0a2e', margin: '0 0 8px' }}>
            Pick the titles you've watched
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', margin: 0 }}>…and see exactly how many hours of your life they took.</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 24px' }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input type="text" placeholder="Search any movie or show…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '14px 44px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', fontSize: 15, outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>Catalog</TabBtn>
          <TabBtn active={tab === 'watched'} onClick={() => setTab('watched')}>My shelf ({count})</TabBtn>
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <FilterChip active={kindFilter === 'all'} onClick={() => setKindFilter('all')}>✨ All types</FilterChip>
          {TYPES.map(t => <FilterChip key={t.id} active={kindFilter === t.id} onClick={() => setKindFilter(t.id)}>{t.emoji} {t.label}</FilterChip>)}
        </div>

        {/* Genre filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginBottom: 24, opacity: 0.8 }}>
          <FilterChip active={genreFilter === 'all'} onClick={() => setGenreFilter('all')} small>All genres</FilterChip>
          {GENRES.map(g => <FilterChip key={g} active={genreFilter === g} onClick={() => setGenreFilter(g)} small>{g}</FilterChip>)}
        </div>

        {/* Grid */}
        {filteredMovies.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '48px 0', fontSize: 15 }}>Nothing found. Clear filters or use the search above ↑</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} watched={watchedIds.has(movie.id)} onClick={() => handleToggle(movie)} />
            ))}
          </div>
        )}
        <div style={{ height: 48 }} />
      </main>

      {showAnalytics && <AnalyticsPopup totalMinutes={totalMinutes} onClose={() => setShowAnalytics(false)} />}
      {similarMovie && (
        <SimilarPopup
          movie={similarMovie}
          allMovies={MOVIES}
          watchedIds={watchedIds}
          onToggle={handleToggle}
          onClose={() => setSimilarMovie(null)}
        />
      )}
    </div>
  );
}

function StatBadge({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: bg, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 100, padding: '6px 14px' }}>
      <span style={{ opacity: 0.7 }}>{icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.6, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: "'Odibee Sans', sans-serif", fontSize: 15, fontWeight: 900 }}>{value}</span>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ padding: '9px 22px', borderRadius: 100, fontSize: 14, fontWeight: 700, border: active ? 'none' : '1px solid rgba(0,0,0,0.12)', background: active ? '#e07b6a' : 'rgba(255,255,255,0.8)', color: active ? 'white' : '#374151', cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? '0 4px 16px rgba(224,123,106,0.4)' : 'none' }}>
      {children}
    </button>
  );
}

function FilterChip({ active, onClick, children, small }: { active: boolean; onClick: () => void; children: React.ReactNode; small?: boolean }) {
  return (
    <button onClick={onClick} style={{ padding: small ? '5px 12px' : '7px 16px', borderRadius: 100, fontSize: small ? 12 : 13, fontWeight: 600, border: active ? 'none' : '1px solid rgba(0,0,0,0.1)', background: active ? '#e07b6a' : 'rgba(255,255,255,0.75)', color: active ? 'white' : '#374151', cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? '0 3px 10px rgba(224,123,106,0.35)' : 'none' }}>
      {children}
    </button>
  );
}
