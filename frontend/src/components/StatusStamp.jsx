import { STATUSES } from '../data/mockApplications';

const LABELS = Object.fromEntries(STATUSES.map((s) => [s.value, s.label]));

// Slight, deterministic rotation per status so stamps feel hand-applied
// rather than uniformly generated, without being distracting.
const ROTATIONS = {
  applied: -2,
  online_assessment: 1.5,
  interview: -1,
  offer: -3,
  rejected: 2,
};

export default function StatusStamp({ status, size = 'md' }) {
  return (
    <span
      className={`stamp stamp--${status} stamp--${size}`}
      style={{ '--stamp-rotate': `${ROTATIONS[status] ?? 0}deg` }}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
