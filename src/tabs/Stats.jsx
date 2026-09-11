import { getWalks } from '../storage';
import { WHERE_TYPES, WHEN_TYPES } from '../constants';

function countByType(walks, field) {
  const counts = {};
  for (const walk of walks) {
    const value = walk[field];
    if (value) counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

function Stats() {
  const walks = getWalks();

  if (walks.length === 0) {
    return (
      <div className="stats">
        <h1>Stats</h1>
        <p className="empty">Log a few walks and your patterns will appear here.</p>
      </div>
    );
  }

  // --- totals ---
  const totalWalks = walks.length;
  const totalMinutes = walks.reduce((sum, w) => sum + w.duration, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const km = ((totalMinutes / 60) * 4).toFixed(1); // ~4 km/h relaxed pace

  // --- distributions ---
  const whenCounts = countByType(walks, 'whenType');
  const whenTotal = Object.values(whenCounts).reduce((a, b) => a + b, 0);
  const whereCounts = countByType(walks, 'whereType');
  const maxWhere = Math.max(...Object.values(whereCounts), 1);

  return (
    <div className="stats">
      <h1>Stats</h1>

      {/* 1 — Atmosphere & Light */}
      <div className="stat-card">
        <p className="stat-title">Notice when you walk</p>
        <div className="atmos-bar">
          {WHEN_TYPES.map((t) => {
            const count = whenCounts[t.value] || 0;
            if (!count) return null;
            const pct = (count / whenTotal) * 100;
            return <span key={t.value} style={{ width: pct + '%', background: t.color }} />;
          })}
        </div>
      </div>

      {/* 2 — Environmental Landscape */}
      <div className="stat-card">
        <p className="stat-title">See where you go</p>
        <div className="where-words">
          {WHERE_TYPES
            .filter((t) => whereCounts[t.value])                          // hide zero-walk types
            .sort((a, b) => whereCounts[b.value] - whereCounts[a.value])  // most frequent first
            .map((t) => {
              const count = whereCounts[t.value];
              const size = 14 + (count / maxWhere) * 22;                  // 14–36px by frequency
              return (
                <div key={t.value} style={{ fontSize: size + 'px', color: t.color, fontWeight: 600 }}>
                  {t.label} <span className="count">{count}</span>
                </div>
              );
            })}
        </div>
      </div>

      {/* 3 — Totals */}
      <div className="stat-card">
        <p className="stat-title">Totals</p>
        <div className="totals">
          <div><span className="big">{totalWalks}</span><span className="unit">walks</span></div>
          <div><span className="big">{totalHours}</span><span className="unit">hours</span></div>
          <div><span className="big">~{km}</span><span className="unit">km</span></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
