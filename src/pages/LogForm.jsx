import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES, SCHEMA_VERSION, CITIES } from '../constants.js';
import PillGroup from '../components/PillGroup.jsx';
import { useWalks } from '../lib/useWalks';
import { LogFormPlaceholder, WalksStatus } from '../components/WalksPlaceholder';
import {
  getCityLabel,
  formatDuration,
  getPlaceTypeMap,
  getRecentCompanions,
  getRecentPlaces,
  todayLocal,
} from '../helpers.js';
import { t } from '../strings';

function LogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { walks, ready, loadError, saveWalk, updateWalk, deleteWalk } = useWalks();

  if (!ready) {
    return (
      <div className="delayed-placeholder">
        <LogFormPlaceholder loadError={loadError} />
      </div>
    );
  }

  const existingWalk = id ? walks.find((walk) => walk.id === id) : null;
  if (id && !existingWalk && loadError) {
    return (
      <div className="log-form">
        <div className="sheet-grabber" />
        <header className="sheet-header">
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('log.cancel')}>✕</button>
          <h1 className="sheet-title">{t('log.editTitle')}</h1>
          <span className="icon-btn" aria-hidden="true" />
        </header>
        <div className="sheet-content">
          <WalksStatus message={loadError} />
        </div>
      </div>
    );
  }

  return (
    <LogFormContent
      key={id || 'new'}
      id={id}
      walks={walks}
      existingWalk={existingWalk}
      loadError={loadError}
      saveWalk={saveWalk}
      updateWalk={updateWalk}
      deleteWalk={deleteWalk}
    />
  );
}

function LogFormContent({ id, walks, existingWalk, loadError, saveWalk, updateWalk, deleteWalk }) {
  const navigate = useNavigate();
  const isEditing = Boolean(existingWalk);
  const recentPlaces = getRecentPlaces(walks);
  const recentCompanions = getRecentCompanions(walks);
  const placeTypeMap = getPlaceTypeMap(walks);

  const [duration, setDuration] = useState(existingWalk?.duration ?? 30);
  const [date, setDate] = useState(existingWalk?.date || todayLocal());
  const [whereType, setWhereType] = useState(existingWalk?.whereType ?? null);
  const [whenType, setWhenType] = useState(existingWalk?.whenType ?? null);
  const [whoType, setWhoType] = useState(existingWalk?.whoType ?? null);
  const [companion, setCompanion] = useState(existingWalk?.companion ?? '');
  const [city, setCity] = useState(existingWalk?.city || CITIES[0].value);
  const [place, setPlace] = useState(existingWalk?.place ?? '');
  const [whereTypeChosen, setWhereTypeChosen] = useState(Boolean(existingWalk?.whereType));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const cityIsPreset = CITIES.some((option) => option.value === city);

  function handleWhereTypeSelect(value) {
    setWhereType(value);
    setWhereTypeChosen(true);
  }

  function handlePlaceChange(value) {
    setPlace(value);
    if (!whereTypeChosen) {
      const rememberedType = placeTypeMap.get(value.trim());
      if (rememberedType) setWhereType(rememberedType);
    }
  }

  async function handleSave() {
    const changes = {
      date, whereType, whenType, duration, whoType, city,
      place: place.trim(),
      companion: companion.trim(),
    };

    setSaveError('');
    setIsSaving(true);
    try {
      if (isEditing) {
        await updateWalk(id, changes);
        navigate('/', { state: { notice: t('log.notice.updated') } });
        return;
      }

      const walk = {
        id: crypto.randomUUID(),
        schemaVersion: SCHEMA_VERSION,
        createdAt: new Date().toISOString(),
        ...changes,
      };

      await saveWalk(walk);
      navigate('/', { state: { notice: t('log.notice.logged') } });
      setDate(todayLocal());
      setWhereType(null);
      setWhenType(null);
      setDuration(30);
      setWhoType(null);
      setCompanion('');
      setCity(CITIES[0].value);
      setPlace('');
      setWhereTypeChosen(false);
    } catch {
      setSaveError(t('log.saveError'));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setSaveError('');
    try {
      await deleteWalk(id);
      navigate('/');
    } catch {
      setShowDeleteConfirm(false);
      setSaveError(t('log.deleteError'));
    }
  }


  return (
    <div className="log-form">
      <div className="sheet-grabber" />

      <header className="sheet-header">
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('log.cancel')}>✕</button>
        <h1 className="sheet-title">{isEditing ? t('log.editTitle') : t('log.newTitle')}</h1>
        <button className="icon-btn primary" onClick={handleSave} aria-label={t('log.save')} disabled={isSaving}>✓</button>
      </header>

      <div className="sheet-content">
        <WalksStatus message={loadError} />
        {saveError && <p className="walks-status" role="alert">{saveError}</p>}
        <section>
          <label>{t('log.fields.where')}</label>
          <PillGroup options={WHERE_TYPES} category="where" selected={whereType} onSelect={handleWhereTypeSelect} />
          <div className="where-details">
            <div className="select-wrap">
              <select id="city" value={city} onChange={(event) => setCity(event.target.value)}>
                {CITIES.map((option) => (
                  <option key={option.value} value={option.value}>{getCityLabel(option.value)}</option>
                ))}
                {!cityIsPreset && <option value={city}>{getCityLabel(city)}</option>}
              </select>
            </div>
            <input
              id="place"
              type="text"
              value={place}
              placeholder={t('log.place')}
              onChange={(event) => handlePlaceChange(event.target.value)}
            />
          </div>
          {recentPlaces.length > 0 && (
            <div className="pills recent-places" aria-label={t('log.recentPlaces')}>
              {recentPlaces.map((recentPlace) => (
                <button
                  key={recentPlace}
                  type="button"
                  className="pill"
                  onClick={() => handlePlaceChange(recentPlace)}
                >
                  {recentPlace}
                </button>
              ))}
            </div>
          )}
        </section>

        <section>
          <label>{t('log.fields.when')}</label>
          <input
            id="date"
            className="date-input"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <PillGroup options={WHEN_TYPES} category="when" selected={whenType} onSelect={setWhenType} />
        </section>

        <section>
          <label>{t('log.fields.duration')}</label>
          <div className="stepper">
            <button onClick={() => setDuration(Math.max(15, duration - 15))}>−</button>
            <span>{formatDuration(duration)}</span>
            <button onClick={() => setDuration(duration + 15)}>+</button>
          </div>
        </section>

        <section>
          <label>{t('log.fields.who')}</label>
          <PillGroup options={WHO_TYPES} category="who" selected={whoType} onSelect={setWhoType} />
          {whoType === 'with-someone' && (
            <div className="companion-details">
              <input
                id="companion"
                type="text"
                value={companion}
                placeholder={t('log.companion')}
                onChange={(event) => setCompanion(event.target.value)}
              />
              {recentCompanions.length > 0 && (
                <div className="pills recent-companions" aria-label={t('log.recentCompanions')}>
                  {recentCompanions.map((recentCompanion) => (
                    <button
                      key={recentCompanion}
                      type="button"
                      className="pill"
                      onClick={() => setCompanion(recentCompanion)}
                    >
                      {recentCompanion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {isEditing && (
          <button className="delete-walk-button" onClick={() => setShowDeleteConfirm(true)}>
            {t('log.delete')}
          </button>
        )}

      </div>

      {showDeleteConfirm && (
        <div className="modal-backdrop" role="presentation">
          <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title">{t('log.deleteConfirm.title')}</h2>
            <p>{t('log.deleteConfirm.message')}</p>
            <div className="confirm-actions">
              <button className="modal-button" onClick={() => setShowDeleteConfirm(false)}>{t('log.deleteConfirm.cancel')}</button>
              <button className="modal-button destructive" onClick={handleDelete}>{t('log.deleteConfirm.confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogForm;
