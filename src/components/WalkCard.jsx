import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES } from '../constants';
import { useNavigate } from 'react-router-dom';

// turn a stored value like "park" back into "🌳 park" for display
function display(list, value) {
  const item = list.find((o) => o.value === value);
  return item ? `${item.icon} ${item.label}` : '';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function WalkCard({ walk }) {
  const navigate = useNavigate();

  return (
    <button className="walk-card" onClick={() => navigate(`/log/${walk.id}`)} aria-label={`Edit walk from ${formatDate(walk.date)}`}>
      <div className="walk-card-top">
        <span>{formatDate(walk.date)} {display(WHEN_TYPES, walk.whenType)}</span>
        <span>{walk.duration} min</span>
      </div>
      <div className="walk-card-top">{display(WHO_TYPES, walk.whoType)}</div>
      <div className="walk-where">{display(WHERE_TYPES, walk.whereType)}</div>
    </button>
  );
}

export default WalkCard;
