import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WHERE_TYPES } from '../constants';
import { getWalks, importWalks } from '../storage';
import { csvToWalks, walksToCsv } from '../csv';
import WalkCard from './WalkCard';

function formatDayDate(dateStr) {
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function formatMonthDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
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
  const [, refresh] = useState(0);
  const walks = [...getWalks()].sort((a, b) => {
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
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

    const importedWalks = csvToWalks(await file.text());
    const importedCount = importWalks(importedWalks);
    setImportMessage(`${importedCount} walk${importedCount === 1 ? '' : 's'} imported`);
    setShowMenu(false);
    refresh((value) => value + 1);
    event.target.value = '';
    window.setTimeout(() => setImportMessage(''), 3000);
  }

  return (
    <div className="all-walks">
      <button className="back-button" onClick={() => navigate(-1)}>‹ Back</button>
      <header className="all-walks-header">
        <h1>All Walks</h1>
        <div className="walks-menu">
          <button
            className="icon-btn"
            type="button"
            aria-label="Import or export walks"
            aria-expanded={showMenu}
            onClick={() => setShowMenu((visible) => !visible)}
          >
            …
          </button>
          {showMenu && (
            <div className="walks-menu-popover" role="menu">
              <button type="button" role="menuitem" onClick={handleExport}>↥&nbsp; Export CSV</button>
              <button type="button" role="menuitem" onClick={() => fileInputRef.current?.click()}>↧&nbsp; Import CSV</button>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImport} hidden />
        </div>
      </header>
      {importMessage && <div className="import-message" role="status">✓&nbsp; {importMessage}</div>}

      {walks.length === 0 ? (
        <p className="empty">Your first walk is waiting.</p>
      ) : (
        <>
          <section className="calendar-panel" aria-label="Walk calendar">
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
                    style={color ? { background: color } : undefined}
                    onClick={() => scrollToDay(dateKey)}
                    aria-label={hasWalk ? `Jump to ${formatDayDate(dateKey)}` : `No walks on ${formatDayDate(dateKey)}`}
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

              return (
                <section key={dateKey} id={`day-${dateKey}`} className="day-group">
                  <a
                    href={`#day-${dateKey}`}
                    className={`day-header ${latestWalk && !latestWalk.whereType ? 'day--untyped' : ''}`.trim()}
                    style={dayColor ? { background: dayColor } : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToDay(dateKey);
                    }}
                  >
                    {formatDayDate(dateKey)}
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
