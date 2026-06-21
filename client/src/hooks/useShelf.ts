import { useState, useEffect, useCallback } from 'react';

export interface ShelfItem {
  movie_id: string;
  watched_at: string;
  title?: string;
  year?: number;
  runtime?: number;
  poster_url?: string;
  kind?: string;
}

const STORAGE_KEY = 'spenthours_shelf';

function loadShelf(): ShelfItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveShelf(items: ShelfItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useShelf() {
  const [shelf, setShelf] = useState<ShelfItem[]>(() => loadShelf());

  const watchedIds = new Set(shelf.map(i => i.movie_id));

  const addToShelf = useCallback((items: Omit<ShelfItem, 'watched_at'>[]) => {
    setShelf(prev => {
      const existing = new Set(prev.map(i => i.movie_id));
      const now = new Date().toISOString();
      const newItems = items
        .filter(i => !existing.has(i.movie_id))
        .map(i => ({ ...i, watched_at: now }));
      const updated = [...prev, ...newItems];
      saveShelf(updated);
      return updated;
    });
  }, []);

  const patchShelf = useCallback((movieId: string, patch: Partial<ShelfItem>) => {
    setShelf(prev => {
      const updated = prev.map(i => (i.movie_id === movieId ? { ...i, ...patch } : i));
      saveShelf(updated);
      return updated;
    });
  }, []);

  const removeFromShelf = useCallback((movieId: string) => {
    setShelf(prev => {
      const updated = prev.filter(i => i.movie_id !== movieId);
      saveShelf(updated);
      return updated;
    });
  }, []);

  const toggleShelf = useCallback((movieId: string, meta?: Omit<ShelfItem, 'watched_at' | 'movie_id'>) => {
    if (watchedIds.has(movieId)) {
      removeFromShelf(movieId);
    } else {
      addToShelf([{ movie_id: movieId, ...meta }]);
    }
  }, [watchedIds, addToShelf, removeFromShelf]);

  const totalMinutes = shelf.reduce((sum, item) => sum + (item.runtime || 110), 0);

  return {
    shelf,
    watchedIds,
    addToShelf,
    removeFromShelf,
    patchShelf,
    toggleShelf,
    totalMinutes,
    count: shelf.length,
  };
}
