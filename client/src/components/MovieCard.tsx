import { Movie, getPoster, formatRuntime } from '@/lib/moviesData';
import { Check } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  watched: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}

export function MovieCard({ movie, watched, onClick, size = 'md' }: MovieCardProps) {
  const poster = getPoster(movie.id);
  const isSmall = size === 'sm';

  return (
    <button
      onClick={onClick}
      className={`movie-card-btn relative flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
        watched
          ? 'border-transparent ring-2 ring-purple-400 shadow-lg shadow-purple-200'
          : 'border-border bg-card hover:border-purple-300'
      }`}
      title={`${movie.title} (${movie.year})`}
    >
      {/* Poster */}
      <div className={`relative w-full overflow-hidden bg-muted ${isSmall ? 'aspect-[2/3]' : 'aspect-[2/3]'}`}>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, #d4c5f9, #c0e8ff)' }}
          >
            {movie.emoji}
          </div>
        )}

        {/* Watched overlay */}
        {watched && (
          <div className="absolute inset-0 flex items-center justify-center bg-purple-600/40">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 shadow-lg">
              <Check size={16} className="text-white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`flex flex-col gap-0.5 p-2 ${isSmall ? 'p-1.5' : 'p-2'}`}>
        <p className={`font-bold leading-tight line-clamp-2 ${isSmall ? 'text-[10px]' : 'text-xs'}`}>
          {movie.title}
        </p>
        <p className={`text-muted-foreground ${isSmall ? 'text-[9px]' : 'text-[10px]'}`}>
          {movie.year} · {formatRuntime(movie.runtime)}
        </p>
      </div>
    </button>
  );
}
