import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES, SCHEMA_VERSION, CITIES } from '../constants.js';
import PillGroup from '../components/PillGroup.jsx';
import { useWalks } from '../lib/useWalks';
import { LogFormPlaceholder, WalksStatus } from '../components/WalksPlaceholder';
import {
  formatDuration,
  getPlaceTypeMap,
  getRecentCompanions,
  getRecentPlaces,
  todayLocal,
} from '../helpers.js';

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
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Cancel">✕</button>
          <h1 className="sheet-title">Edit Walk</h1>
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
  const [city, setCity] = useState(existingWalk?.city || CITIES[0]);
  const [place, setPlace] = useState(existingWalk?.place ?? '');
  const [whereTypeChosen, setWhereTypeChosen] = useState(Boolean(existingWalk?.whereType));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
        navigate('/', { state: { notice: 'Walk updated' } });
        return;
      }

      const walk = {
        id: crypto.randomUUID(),
        schemaVersion: SCHEMA_VERSION,
        createdAt: new Date().toISOString(),
        ...changes,
      };

      await saveWalk(walk);
      navigate('/', { state: { notice: 'Walk logged' } });
      setDate(todayLocal());
      setWhereType(null);
      setWhenType(null);
      setDuration(30);
      setWhoType(null);
      setCompanion('');
      setCity(CITIES[0]);
      setPlace('');
      setWhereTypeChosen(false);
    } catch {
      setSaveError("Couldn't save this walk. Your changes are still here. Try again.");
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
      setSaveError("Couldn't delete this walk. Try again in a few minutes.");
    }
  }


  return (
    <div className="log-form">
      <div className="sheet-grabber" />

      <header className="sheet-header">
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Cancel">✕</button>
        <h1 className="sheet-title">{isEditing ? 'Edit Walk' : 'New Walk'}</h1>
        <button className="icon-btn primary" onClick={handleSave} aria-label="Save" disabled={isSaving}>✓</button>
      </header>

      <div className="sheet-content">
        <WalksStatus message={loadError} />
        {saveError && <p className="walks-status" role="alert">{saveError}</p>}
        <section>
          <label>WHERE?</label>
          <PillGroup options={WHERE_TYPES} selected={whereType} onSelect={handleWhereTypeSelect} />
          <div className="where-details">
            <div className="select-wrap">
              <select id="city" value={city} onChange={(event) => setCity(event.target.value)}>
                {CITIES.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <input
              id="place"
              type="text"
              value={place}
              placeholder="PLACE NAME"
              onChange={(event) => handlePlaceChange(event.target.value)}
            />
          </div>
          {recentPlaces.length > 0 && (
            <div className="pills recent-places" aria-label="Recent places">
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
          <label>WHEN?</label>
          <input
            id="date"
            className="date-input"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <PillGroup options={WHEN_TYPES} selected={whenType} onSelect={setWhenType} />
        </section>

        <section>
          <label>HOW LONG?</label>
          <div className="stepper">
            <button onClick={() => setDuration(Math.max(15, duration - 15))}>−</button>
            <span>{formatDuration(duration)}</span>
            <button onClick={() => setDuration(duration + 15)}>+</button>
          </div>
        </section>

        <section>
          <label>WHO?</label>
          <PillGroup options={WHO_TYPES} selected={whoType} onSelect={setWhoType} />
          {whoType === 'with-someone' && (
            <div className="companion-details">
              <input
                id="companion"
                type="text"
                value={companion}
                placeholder="COMPANION"
                onChange={(event) => setCompanion(event.target.value)}
              />
              {recentCompanions.length > 0 && (
                <div className="pills recent-companions" aria-label="Recent companions">
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
            DELETE THE WALK
          </button>
        )}

      </div>

      {showDeleteConfirm && (
        <div className="modal-backdrop" role="presentation">
          <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title">Delete this walk?</h2>
            <p>It will be deleted forever</p>
            <div className="confirm-actions">
              <button className="modal-button" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="modal-button destructive" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogForm;
