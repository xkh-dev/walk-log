import { useNavigate } from 'react-router-dom';
import { getWalks } from '../storage';
import { WHERE_TYPES, WHO_TYPES } from '../constants';
import WalkCard from '../components/WalkCard';
import { formatDuration } from '../helpers';

// this week's quote — later this comes from a quotes archive (Phase 3)
const QUOTE = {
  person: 'Carl Rogers',
  text: "People are just as wonderful as sunsets if you let them be... I don't try to control a sunset. I watch with awe as it unfolds.",
};

function countByType(walks, field) {
  const counts = {};
  for (const walk of walks) {
    const value = walk[field];
    if (value) counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

// the most common value of a field (the "mode")
function topType(walks, field) {
  const counts = countByType(walks, field);
  let top = null, max = 0;
  for (const value in counts) {
    if (counts[value] > max) { max = counts[value]; top = value; }
  }
  return top;
}

function display(list, value) {
  const item = list.find((o) => o.value === value);
  return item ? `${item.icon} ${item.label}` : '—';
}

function Walk() {
  const navigate = useNavigate();
  
  const walks = getWalks();

  const totalWalks = walks.length;
  const totalMinutes = walks.reduce((sum, w) => sum + w.duration, 0);
  const mostWhere = topType(walks, 'whereType');
  const mostWho = topType(walks, 'whoType');
  const latest = walks[walks.length - 1]; // most recent walk

  return (
    <div className="walk-home">
      <h1>Walk, Log</h1>

      {/* weekly quote */}
      <div className="quote-card">
        <p className="quote-label">This week walking with</p>
        <p className="quote-person">
          {QUOTE.person} <span className="info" title="About this person">ⓘ</span>
        </p>
        <blockquote className="quote-text">“{QUOTE.text}”</blockquote>
      </div>

      {/* most recent walk (reuses your WalkCard) */}
      {latest
        ? <WalkCard walk={latest} />
        : <p className="empty">No walks yet. Log your first one.</p>}

      {/* totals card — tap to open All Walks */}
      <button className="total-card" onClick={() => navigate('/walks')}>
        <span className="total-number">{totalWalks}</span>
        <span className="total-label">walks total</span>
        <span className="see-all">All Walks ›</span>
      </button>

      {/* quick summary */}
      <div className="summary">
        <div className="summary-row"><span>Duration</span><b>{formatDuration(totalMinutes)}</b></div>
        <div className="summary-row"><span>Most</span><b>{display(WHERE_TYPES, mostWhere)}</b></div>
        <div className="summary-row"><span>Usually</span><b>{display(WHO_TYPES, mostWho)}</b></div>
      </div>

      {/* footer */}
      <footer className="walk-footer">
        <span>Walk, Log v0.1.0</span>
        <span>Made by САША</span>
      </footer>
    </div>
  );
}

export default Walk;
