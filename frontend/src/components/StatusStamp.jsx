import { STATUSES } from '../data/statuses';

const LABELS = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]));

export default function StatusStamp({ status, size = 'md' }) {
  return (
    <span className={`stamp stamp--${status} stamp--${size}`}>
      {LABELS[status] ?? status}
    </span>
  );
}
