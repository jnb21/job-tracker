import { STATUSES } from '../data/statuses';

export default function StatusFilter({ activeStatus, onChange, counts }) {
  return (
    <div className="filter-row" role="tablist" aria-label="Filter by status">
      <button
        type="button"
        role="tab"
        aria-selected={activeStatus === 'all'}
        className={`filter-chip ${activeStatus === 'all' ? 'is-active' : ''}`}
        onClick={() => onChange('all')}
      >
        All <span className="filter-chip__count">{counts.all}</span>
      </button>
      {STATUSES.map((s) => (
        <button
          key={s.value}
          type="button"
          role="tab"
          aria-selected={activeStatus === s.value}
          className={`filter-chip filter-chip--${s.value} ${
            activeStatus === s.value ? 'is-active' : ''
          }`}
          onClick={() => onChange(s.value)}
        >
          {s.label} <span className="filter-chip__count">{counts[s.value] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
