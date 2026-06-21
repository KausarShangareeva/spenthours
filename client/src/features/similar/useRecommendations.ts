import { useCallback, useEffect, useState } from 'react';
import { recommendations, type TItem } from '@/lib/tmdb';

/** Live TMDB recommendations for a title, paginated via `more()`. */
export function useRecommendations(item: TItem) {
  const [recs, setRecs] = useState<TItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true); setRecs([]); setPage(1);
    recommendations(item.media, item.tmdbId, 1)
      .then(r => { if (alive) { setRecs(r.items); setTotalPages(r.totalPages); } })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [item.id]);

  const more = useCallback(async () => {
    if (page >= totalPages) return false;
    const np = page + 1;
    const r = await recommendations(item.media, item.tmdbId, np);
    setRecs(prev => { const seen = new Set(prev.map(p => p.id)); return [...prev, ...r.items.filter(x => !seen.has(x.id))]; });
    setPage(np);
    return true;
  }, [item, page, totalPages]);

  return { recs, loading, hasMore: page < totalPages, more };
}
