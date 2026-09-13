import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES } from '../constants.js';
import PillGroup from '../components/PillGroup.jsx';
import { deleteWalk, getWalks, saveWalk, updateWalk } from '../storage.js';

function LogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingWalk = id ? getWalks().find((walk) => walk.id === id) : null;
  const isEditing = Boolean(existingWalk);

  const [duration, setDuration] = useState(existingWalk?.duration ?? 30);
  const [whereType, setWhereType] = useState(existingWalk?.whereType ?? null);
  const [whenType, setWhenType] = useState(existingWalk?.whenType ?? null);
  const [whoType, setWhoType] = useState(existingWalk?.whoType ?? null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleSave() {
    const changes = { whereType, whenType, duration, whoType };

    if (isEditing) {
      updateWalk(id, changes);
      navigate(-1);
      return;
    }

    const walk = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      ...changes,
      city: '',
      place: '',
      companion: '',
    };

    saveWalk(walk);
    setWhereType(null);
    setWhenType(null);
    setDuration(30);
    setWhoType(null);
  }

  function handleDelete() {
    deleteWalk(id);
    navigate(-1);
  }


  return (
    <div className="log-form">
      <div className="sheet-grabber" />

      <header className="sheet-header">
        <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Cancel">✕</button>
        <h1 className="sheet-title">{isEditing ? 'Edit Walk' : 'New Walk'}</h1>
        <button className="icon-btn primary" onClick={handleSave} aria-label="Save">✓</button>
      </header>

      <div className="sheet-content">
        <section>
          <label>WHERE?</label>
          <PillGroup options={WHERE_TYPES} selected={whereType} onSelect={setWhereType} />
        </section>

        <section>
          <label>WHEN?</label>
          <PillGroup options={WHEN_TYPES} selected={whenType} onSelect={setWhenType} />
        </section>

        <section>
          <label>HOW LONG?</label>
          <div className="stepper">
            <button onClick={() => setDuration(Math.max(15, duration - 15))}>−</button>
            <span>{duration} min</span>
            <button onClick={() => setDuration(duration + 15)}>+</button>
          </div>
        </section>

        <section>
          <label>WHO?</label>
          <PillGroup options={WHO_TYPES} selected={whoType} onSelect={setWhoType} />
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
