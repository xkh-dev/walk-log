import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDuration } from '../helpers';
import { t } from '../strings';

function display(list, category, value) {
  const item = list.find((o) => o.value === value);
  return item ? `${item.icon} ${t(`categories.${category}.${value}`)}` : '';
}

function WalkCard({ walk }) {
  const navigate = useNavigate();

  return (
    <button className="walk-card" onClick={() => navigate(`/log/${walk.id}`)} aria-label={t('walkCard.edit', { date: formatDate(new Date(`${walk.date}T12:00:00`)) })}>
      <div className="walk-card-top">
        <span>{formatDate(new Date(`${walk.date}T12:00:00`))} {display(WHEN_TYPES, 'when', walk.whenType)}</span>
        <span>{formatDuration(walk.duration)}</span>
      </div>
      <div className="walk-card-top">{display(WHO_TYPES, 'who', walk.whoType)}</div>
      <div className="walk-where">{display(WHERE_TYPES, 'where', walk.whereType)}</div>
    </button>
  );
}

export default WalkCard;
