import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWalks } from '../lib/useWalks';
import { WHERE_TYPES, WHO_TYPES } from '../constants';
import WalkCard from '../components/WalkCard';
import { HomeWalksPlaceholder, WalksStatus } from '../components/WalksPlaceholder';
import { formatDuration } from '../helpers';
import { t } from '../strings';

// this week's quote — later this comes from a quotes archive (Phase 3)
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

function display(list, category, value) {
  const item = list.find((o) => o.value === value);
  return item ? `${item.icon} ${t(`categories.${category}.${value}`)}` : '—';
}

function Walk() {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = location.state?.notice || '';
  const { walks, ready, loadError } = useWalks();

  useEffect(() => {
    if (!notice) return undefined;

    const timeoutId = window.setTimeout(() => {
      navigate(location.pathname, { replace: true, state: null });
    }, 3000);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, navigate, notice]);

  const totalWalks = walks.length;
  const totalMinutes = walks.reduce((sum, w) => sum + w.duration, 0);
  const mostWhere = topType(walks, 'whereType');
  const mostWho = topType(walks, 'whoType');
  const latest = walks[walks.length - 1]; // most recent walk

  return (
    <div className="walk-home">
      <header className="walk-home-header">
        <h1>{t('home.title')}</h1>
        <Link className="icon-btn" to="/account" aria-label={t('home.settings')}>…</Link>
      </header>
      {notice && <div className="import-message" role="status">✓&nbsp; {notice}</div>}
      <WalksStatus message={loadError} />

      {/* weekly quote */}
      <div className="quote-card">
        <p className="quote-label">{t('home.quote.label')}</p>
        <p className="quote-person">
          {t('home.quote.person')} <span className="info" title={t('home.aboutPerson')}>ⓘ</span>
        </p>
        <blockquote className="quote-text">“{t('home.quote.text')}”</blockquote>
      </div>

      {/* most recent walk (reuses your WalkCard) */}
      {ready ? (
        <>
          {latest
            ? <WalkCard walk={latest} />
            : loadError
              ? null
              : <p className="empty">{t('home.empty')}</p>}

          <button className="total-card" onClick={() => navigate('/walks')}>
            <span className="total-number">{totalWalks}</span>
            <span className="total-label">{t('home.totalWalks')}</span>
            <span className="see-all">{t('home.allWalks')}</span>
          </button>

          <div className="summary">
            <div className="summary-row"><span>{t('home.duration')}</span><b>{formatDuration(totalMinutes)}</b></div>
            <div className="summary-row"><span>{t('home.most')}</span><b>{display(WHERE_TYPES, 'where', mostWhere)}</b></div>
            <div className="summary-row"><span>{t('home.usually')}</span><b>{display(WHO_TYPES, 'who', mostWho)}</b></div>
          </div>
        </>
      ) : (
        <div className="delayed-placeholder">
          <HomeWalksPlaceholder />
        </div>
      )}

      {/* footer */}
      <footer className="walk-footer">
        <span>{t('home.version')}</span>
        <span>{t('home.madeBy')}</span>
      </footer>
    </div>
  );
}

export default Walk;
