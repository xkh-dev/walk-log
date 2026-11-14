import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WHERE_TYPES } from '../constants';
import { useWalks } from '../lib/useWalks';
import { csvToWalks, walksToCsv } from '../lib/csv';
import WalkCard from '../components/WalkCard';
import {
  CalendarPlaceholder,
  WalkListPlaceholder,
  WalksStatus,
} from '../components/WalksPlaceholder';
import { formatDate, formatDuration, formatMonthDate, formatWeekdayLabels } from '../helpers';
import { t, tp } from '../strings';

function formatDayDate(dateStr) {
  return formatDate(new Date(`${dateStr}T12:00:00`));
}

function getWalkColor(walk) {
  if (!walk?.whereType) return null;
  const match = WHERE_TYPES.find((option) => option.value === walk.whereType);
  return match ? match.color : null;
}

function getDayKey(date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  const localDate = new Date(date);
  const y = localDate.getFullYear();
  const m = String(localDate.getMonth() + 1).padStart(2, '0');
  const d = String(localDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function AllWalks() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const [importError, setImportError] = useState(false);
  const { walks: allWalks, ready, loadError, importWalks } = useWalks();
  const walks = [...allWalks].sort((a, b) => {
    const aDate = getDayKey(a.date || a.createdAt);
    const bDate = getDayKey(b.date || b.createdAt);
    return bDate.localeCompare(aDate) || new Date(b.createdAt) - new Date(a.createdAt);
  });

  const dateLookup = walks.reduce((lookup, walk) => {
    const dateKey = getDayKey(walk.date || walk.createdAt);
    if (!lookup[dateKey]) lookup[dateKey] = [];
    lookup[dateKey].push(walk);
    return lookup;
  }, {});

  const dateEntries = Object.entries(dateLookup).sort(([a], [b]) => b.localeCompare(a));
  const anchorMonth = walks[0] ? new Date(`${walks[0].date || walks[0].createdAt}T12:00:00`) : new Date();
  const monthStart = new Date(anchorMonth.getFullYear(), anchorMonth.getMonth(), 1);
  const firstDayOfMonth = monthStart.getDay();
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  const weekdayLabels = formatWeekdayLabels();

  const scrollToDay = (dateKey) => {
    const daySection = document.getElementById(`day-${dateKey}`);
    if (daySection) {
      daySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  function handleExport() {
    const blob = new Blob([walksToCsv(walks)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `walks-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  }

  async function handleImport(event) {
    const [file] = event.target.files || [];
    if (!file) return;

    try {
      const importedWalks = csvToWalks(await file.text());
      const { added, skipped } = await importWalks(importedWalks);
      setImportError(false);
      setImportMessage(t('allWalks.importSummary', {
        added: tp('allWalks.added', added),
        skipped: tp('allWalks.skipped', skipped),
      }));
      setShowMenu(false);
      window.setTimeout(() => setImportMessage(''), 3000);
    } catch {
      setImportError(true);
      setImportMessage(t('allWalks.importError'));
    } finally {
      event.target.value = '';
    }
  }

  return (
    <div className="all-walks">
      <button className="back-button" onClick={() => navigate(-1)}>{t('allWalks.back')}</button>
      <header className="all-walks-header">
        <h1>{t('allWalks.title')}</h1>
        <div className="walks-menu">
          <button
            className="icon-btn"
            type="button"
            aria-label={t('allWalks.importExport')}
            aria-expanded={showMenu}
            disabled={!ready}
            onClick={() => setShowMenu((visible) => !visible)}
          >
            …
          </button>
          {showMenu && (
            <div className="walks-menu-popover" role="menu">
              <button type="button" role="menuitem" onClick={handleExport}>{t('allWalks.export')}</button>
              <button type="button" role="menuitem" onClick={() => fileInputRef.current?.click()}>{t('allWalks.import')}</button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleImport}
            aria-label={t('allWalks.importFromCsv')}
            hidden
          />
        </div>
      </header>
      {importMessage && (
        <div className="import-message" role={importError ? 'alert' : 'status'}>
          {!importError && '✓\u00a0'}{importMessage}
        </div>
      )}
      <WalksStatus message={loadError} />

      {!ready ? (
        <div className="delayed-placeholder">
          <CalendarPlaceholder />
          <WalkListPlaceholder />
        </div>
      ) : walks.length === 0 ? (
        loadError ? null : <p className="empty">{t('allWalks.empty')}</p>
      ) : (
        <>
          <section className="calendar-panel" aria-label={t('allWalks.calendar')}>
            <div className="calendar-header">
              <h2>{formatMonthDate(monthStart)}</h2>
            </div>

            <div className="calendar-weekdays" aria-hidden="true">
              {weekdayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="calendar-grid">
              {Array.from({ length: firstDayOfMonth }, (_, index) => (
                <div key={`empty-${index}`} className="calendar-day empty-day" />
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const dayNumber = index + 1;
                const y = monthStart.getFullYear();
                const m = String(monthStart.getMonth() + 1).padStart(2, '0');
                const d = String(dayNumber).padStart(2, '0');
                const dateKey = `${y}-${m}-${d}`;
                const dayWalks = dateLookup[dateKey] || [];
                const dayDuration = dayWalks.reduce((sum, walk) => sum + walk.duration, 0);
                const latestWalk = dayWalks.length
                  ? [...dayWalks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
                  : null;
                const color = latestWalk ? getWalkColor(latestWalk) : null;
                const hasWalk = Boolean(latestWalk);

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={`calendar-day ${hasWalk ? 'has-walk' : ''} ${latestWalk && !latestWalk.whereType ? 'day--untyped' : ''}`.trim()}
                    style={color ? { '--walk-color': color } : undefined}
                    onClick={() => scrollToDay(dateKey)}
                    aria-label={hasWalk
                      ? t('allWalks.jumpTo', { date: formatDayDate(dateKey), duration: formatDuration(dayDuration) })
                      : t('allWalks.noWalksOn', { date: formatDayDate(dateKey) })}
                  >
                    <span>{dayNumber}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="walk-list">
            {dateEntries.map(([dateKey, dayWalks]) => {
              const latestWalk = [...dayWalks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
              const dayColor = getWalkColor(latestWalk);
              const dayDuration = dayWalks.reduce((sum, walk) => sum + walk.duration, 0);

              return (
                <section key={dateKey} id={`day-${dateKey}`} className="day-group">
                  <a
                    href={`#day-${dateKey}`}
                    className={`day-header ${latestWalk && !latestWalk.whereType ? 'day--untyped' : ''}`.trim()}
                    style={dayColor ? { '--walk-color': dayColor } : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToDay(dateKey);
                    }}
                  >
                    {formatDayDate(dateKey)} <span className="day-duration">{formatDuration(dayDuration)}</span>
                  </a>

                  {dayWalks.map((walk) => (
                    <WalkCard key={walk.id} walk={walk} />
                  ))}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default AllWalks;
