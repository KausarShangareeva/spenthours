import s from './Loader.module.css';

export function Loader({ label }: { label?: string }) {
  return (
    <div className={s.wrap}>
      <span className={s.dot} />
      {label && <span className={s.label}>{label}</span>}
    </div>
  );
}
