import { useEffect } from 'react';

/** Calls `onMore` whenever the viewport nears the bottom of the page. */
export function useInfiniteScroll(onMore: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const handler = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) onMore();
    };
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });
    const t = setTimeout(handler, 80); // fill first screen / cascade after each batch
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      clearTimeout(t);
    };
  }, [onMore, enabled]);
}
