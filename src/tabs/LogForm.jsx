import { useState } from 'react';
import { WHERE_TYPES, WHEN_TYPES, WHO_TYPES } from '../constants.js';
import PillGroup from '../components/PillGroup.jsx';
import { saveWalk } from '../storage.js';

function LogForm() {
  const [duration, setDuration] = useState(30);
  const [whereType, setWhereType] = useState(null);
  const [whenType, setWhenType] = useState(null);
  const [whoType, setWhoType] = useState(null);

function handleSave() {
  const walk = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    date: new Date().toISOString().slice(0, 10), // "YYYY-MM-DD", today for now

    whereType,
    whenType,
    duration,
    whoType,

    city: '',        // reserved for later
    place: '',
    companion: '',
  };

  saveWalk(walk);
  console.log('Saved walk:', walk); // so you can watch it work

  // reset the form for the next walk
  setWhereType(null);
  setWhenType(null);
  setDuration(30);
  setWhoType(null);
}


  return (
    <div className="log-form">
      <h1>New Walk</h1>

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

      <button className="save-button" onClick={handleSave}>SAVE</button>

    </div>
  );
}

export default LogForm;
