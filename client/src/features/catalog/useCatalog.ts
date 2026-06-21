import { useCallback, useEffect, useRef, useState } from 'react';
import { discover, search, type TItem } from '@/lib/tmdb';

/**
 * Live catalog backed by TMDB. Switches between discover (type + genre) and
 * full-text search, with real pagination.
 */
export function useCatalog(type: string, gid: number | 'all', query: string, active: boolean) {
  const [items, setItems] = useState<TItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const reqId = useRef(0);

  const q = query.trim();
  const fetchPage = useCallback(
    (p: number) => (q ? search(q, p) : discover(type, gid === 'all' ? null : gid, p)),
    [q, type, gid],
  );

  // (re)load from page 1 on any filter / query change
  useEffect(() => {
    if (!active) return;
    const id = ++reqId.current;
    setLoading(true);
    loadingRef.current = true;
    window.scrollTo({ top: 0 });
    fetchPage(1)
      .then(r => { if (id === reqId.current) { setItems(r.items); setPage(1); setTotalPages(r.totalPages); } })
      .catch(() => { if (id === reqId.current) { setItems([]); setTotalPages(1); } })
      .finally(() => { if (id === reqId.current) { setLoading(false); loadingRef.current = false; } });
  }, [fetchPage, active]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !active || page >= totalPages) return;
    const id = reqId.current;
    loadingRef.current = true;
    setLoading(true);
    fetchPage(page + 1)
      .then(r => {
        if (id !== reqId.current) return;
        setItems(prev => { const seen = new Set(prev.map(p => p.id)); return [...prev, ...r.items.filter(x => !seen.has(x.id))]; });
        setPage(p => p + 1);
      })
      .finally(() => { if (id === reqId.current) { loadingRef.current = false; setLoading(false); } });
  }, [fetchPage, page, totalPages, active]);

  return { items, loading, hasMore: page < totalPages, loadMore };
}
