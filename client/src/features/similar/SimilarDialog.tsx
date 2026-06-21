import { useState } from 'react';
import { X, Check, CheckCheck, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/Modal';
import { PillButton } from '@/components/ui/PillButton';
import { PosterCard } from '@/components/ui/PosterCard';
import { Loader } from '@/components/ui/Loader';
import { useRuntimes } from '@/hooks/useRuntimes';
import type { TItem } from '@/lib/tmdb';
import { useRecommendations } from './useRecommendations';
import s from './SimilarDialog.module.css';

interface Props {
  item: TItem;
  watchedIds: Set<string>;
  onMark: (it: TItem) => void;
  onClose: () => void;
}

export function SimilarDialog({ item, watchedIds, onMark, onClose }: Props) {
  const { recs, loading, hasMore, more } = useRecommendations(item);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const visible = useRuntimes(recs.filter(x => !watchedIds.has(x.id)));

  const toggleSel = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const markAll = () => { visible.forEach(onMark); toast.success(`Added ${visible.length} to your shelf`); onClose(); };
  const markSelected = () => { visible.filter(x => selected.has(x.id)).forEach(onMark); toast.success(`Added ${selected.size} to your shelf`); onClose(); };
  const suggestMore = async () => {
    // keep what's already selected — just load a fresh batch
    if (!hasMore) { toast('No more titles like this'); return; }
    try { await more(); toast.success('More like this'); }
    catch { toast('Could not load more'); }
  };
  // closing keeps your picks: anything you tapped is saved to the shelf
  const dismiss = () => { visible.filter(x => selected.has(x.id)).forEach(onMark); onClose(); };

  return (
    <Modal onClose={dismiss} maxWidth={980} showClose={false}>
      <header className={s.header}>
        <PillButton variant="primary" onClick={markAll} disabled={!visible.length}>
          <CheckCheck size={15} />Mark all ({visible.length})
        </PillButton>
        {selected.size > 0 && (
          <PillButton variant="dark" onClick={markSelected}>
            <Check size={15} />Mark selected ({selected.size})
          </PillButton>
        )}
        <PillButton variant="ghost" onClick={suggestMore}>
          <Shuffle size={14} />Suggest similar
        </PillButton>
        <button className={s.close} onClick={dismiss} aria-label="Close"><X size={16} /></button>
      </header>

      <div className={s.titleBlock}>
        <p className={s.eyebrow}>✨ You might have also watched</p>
        <h2 className={s.title}>Similar to "{item.title}"</h2>
        <p className={s.sub}>Tap any you recognise — they'll be added to your shelf.</p>
      </div>

      <div className={s.body}>
        {loading ? (
          <Loader label="Finding similar titles…" />
        ) : visible.length === 0 ? (
          <div className={s.empty}>No recommendations found for this title.</div>
        ) : (
          <div className={s.grid}>
            {visible.map(m => (
              <PosterCard key={m.id} item={m} selected={selected.has(m.id)} onClick={() => toggleSel(m.id)} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
