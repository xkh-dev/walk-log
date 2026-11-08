function Shape({ className = '' }) {
  return <span className={`placeholder-shape ${className}`.trim()} />;
}

export function WalksStatus({ message }) {
  return message ? <p className="walks-status" role="status">{message}</p> : null;
}

export function WalkCardPlaceholder() {
  return (
    <div className="walk-card walk-card-placeholder" aria-hidden="true">
      <div className="walk-card-top">
        <Shape className="placeholder-line placeholder-line-long" />
        <Shape className="placeholder-line placeholder-line-short" />
      </div>
      <div className="walk-card-top">
        <Shape className="placeholder-line placeholder-line-medium" />
      </div>
      <div className="walk-where">
        <Shape className="placeholder-line placeholder-line-where" />
      </div>
    </div>
  );
}

export function HomeWalksPlaceholder() {
  return (
    <div aria-hidden="true">
      <WalkCardPlaceholder />
      <div className="total-card total-card-placeholder">
        <Shape className="placeholder-line placeholder-line-number" />
        <Shape className="placeholder-line placeholder-line-short" />
        <Shape className="placeholder-line placeholder-line-medium" />
      </div>
      <div className="summary summary-placeholder">
        {[0, 1, 2].map((row) => (
          <div className="summary-row" key={row}>
            <Shape className="placeholder-line placeholder-line-short" />
            <Shape className="placeholder-line placeholder-line-medium" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsPlaceholder() {
  return (
    <div aria-hidden="true">
      <div className="stat-card">
        <Shape className="placeholder-line placeholder-stat-title" />
        <Shape className="placeholder-block placeholder-atmos-bar" />
      </div>
      <div className="stat-card">
        <Shape className="placeholder-line placeholder-stat-title" />
        <div className="placeholder-words">
          <Shape className="placeholder-line placeholder-line-medium" />
          <Shape className="placeholder-line placeholder-line-long" />
          <Shape className="placeholder-line placeholder-line-short" />
        </div>
      </div>
      <div className="stat-card">
        <Shape className="placeholder-line placeholder-stat-title" />
        <div className="totals totals-placeholder">
          {[0, 1, 2].map((column) => (
            <div key={column}>
              <Shape className="placeholder-line placeholder-total-number" />
              <Shape className="placeholder-line placeholder-total-unit" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CalendarPlaceholder() {
  return (
    <section className="calendar-panel calendar-placeholder" aria-hidden="true">
      <div className="calendar-header">
        <Shape className="placeholder-line placeholder-month-title" />
      </div>
      <div className="calendar-weekdays">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <Shape className="placeholder-line placeholder-weekday" key={day} />
        ))}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: 35 }, (_, day) => (
          <Shape className="placeholder-block placeholder-calendar-day" key={day} />
        ))}
      </div>
    </section>
  );
}

export function WalkListPlaceholder() {
  return (
    <div className="walk-list" aria-hidden="true">
      {[0, 1].map((day) => (
        <section className="day-group" key={day}>
          <Shape className="day-header placeholder-day-header" />
          <WalkCardPlaceholder />
        </section>
      ))}
    </div>
  );
}

export function LogFormPlaceholder({ loadError }) {
  return (
    <div className="log-form log-form-placeholder">
      <div className="sheet-grabber" />
      <header className="sheet-header">
        <Shape className="placeholder-circle" />
        <Shape className="placeholder-line placeholder-form-title" />
        <Shape className="placeholder-circle" />
      </header>
      <div className="sheet-content">
        <WalksStatus message={loadError} />
        {[0, 1, 2, 3].map((section) => (
          <section className="placeholder-form-section" key={section}>
            <Shape className="placeholder-line placeholder-form-label" />
            {section === 0 && (
              <>
                <div className="placeholder-pills">
                  {[0, 1, 2].map((pill) => (
                    <Shape className="placeholder-pill" key={pill} />
                  ))}
                </div>
                <div className="placeholder-form-inputs">
                  <Shape className="placeholder-block placeholder-form-input" />
                  <Shape className="placeholder-block placeholder-form-input" />
                </div>
              </>
            )}
            {section === 1 && (
              <>
                <Shape className="placeholder-block placeholder-form-input" />
                <div className="placeholder-pills">
                  {[0, 1, 2, 3].map((pill) => (
                    <Shape className="placeholder-pill" key={pill} />
                  ))}
                </div>
              </>
            )}
            {section === 2 && (
              <div className="placeholder-stepper">
                <Shape className="placeholder-circle" />
                <Shape className="placeholder-line placeholder-stepper-value" />
                <Shape className="placeholder-circle" />
              </div>
            )}
            {section === 3 && (
              <div className="placeholder-pills">
                {[0, 1, 2].map((pill) => (
                  <Shape className="placeholder-pill" key={pill} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
