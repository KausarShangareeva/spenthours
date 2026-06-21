import { useEffect, useState } from 'react';
import { runtimeCache, runtimeOf, type TItem } from '@/lib/tmdb';

const CONCURRENCY = 6;

/**
 * List endpoints don't return runtime, so we lazily fetch it for the given items,
 * cache it globally, and return the same items enriched with `runtime`.
 */
export function useRuntimes(items: TItem[]): TItem[] {
  const [, force] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const queue = items.filter(it => it.runtime == null && !runtimeCache.has(it.id));
    if (!queue.length) return;
    let active = 0;
    const pump = () => {
      while (active < CONCURRENCY && queue.length) {
        const it = queue.shift()!;
        active++;
        runtimeOf(it.media, it.tmdbId)
          .then(rt => { runtimeCache.set(it.id, rt); })
          .finally(() => { active--; if (!cancelled) { force(x => x + 1); pump(); } });
      }
    };
    pump();
    return () => { cancelled = true; };
  }, [items]);

  return items.map(it =>
    it.runtime != null ? it : runtimeCache.has(it.id) ? { ...it, runtime: runtimeCache.get(it.id) } : it,
  );
}
