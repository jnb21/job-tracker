import { STATUSES } from '../data/mockApplications';

export default function StatsBar({ applications }) {
  const total = applications.length;
  const counts = Object.fromEntries(STATUSES.map((s) => [s.value, 0]));
  applications.forEach((a) => {
    counts[a.status] = (counts[a.status] ?? 0) + 1;
  });

  const active = total - counts.rejected;
  const responseRate = total
    ? Math.round(((total - counts.applied) / total) * 100)
    : 0;

  return (
    <div className="stats">
      <div className="stats__figure">
        <span className="stats__number">{total}</span>
        <span className="stats__label">Total logged</span>
      </div>
      <div className="stats__divider" aria-hidden="true" />
      <div className="stats__figure">
        <span className="stats__number">{active}</span>
        <span className="stats__label">Still active</span>
      </div>
      <div className="stats__divider" aria-hidden="true" />
      <div className="stats__figure">
        <span className="stats__number">{counts.offer}</span>
        <span className="stats__label">Offers</span>
      </div>
      <div className="stats__divider" aria-hidden="true" />
      <div className="stats__figure">
        <span className="stats__number">{responseRate}%</span>
        <span className="stats__label">Moved past applied</span>
      </div>
    </div>
  );
}
