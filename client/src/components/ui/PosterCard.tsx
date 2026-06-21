import { Check } from 'lucide-react';
import { formatRuntime, type TItem } from '@/lib/tmdb';
import s from './PosterCard.module.css';

interface PosterCardProps {
  item: TItem;
  watched?: boolean;
  selected?: boolean;
  onClick: () => void;
}

export function PosterCard({ item, watched, selected, onClick }: PosterCardProps) {
  const meta = [item.year, item.runtime ? formatRuntime(item.runtime) : ''].filter(Boolean).join(' · ');
  const state = watched ? s.watched : selected ? s.selected : '';

  return (
    <button onClick={onClick} className={`${s.card} ${state}`}>
      <div className={s.posterWrap}>
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            loading="lazy"
            className={s.poster}
            onError={e => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              const p = img.parentElement;
              if (p) { p.classList.add(s.fallback); p.textContent = item.emoji; }
            }}
          />
        ) : (
          <div className={`${s.poster} ${s.fallback}`}>{item.emoji}</div>
        )}
        {(watched || selected) && (
          <span className={s.badge}><Check size={14} color="#fff" strokeWidth={3} /></span>
        )}
      </div>
      <div className={s.meta}>
        <p className={s.title}>{item.title}</p>
        <p className={s.sub}>{meta}</p>
      </div>
    </button>
  );
}
