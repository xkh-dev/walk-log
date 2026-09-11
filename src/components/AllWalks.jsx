import { getWalks } from '../storage';
import WalkCard from './WalkCard';

function AllWalks({ onBack }) {
  const walks = getWalks(); // read straight from local storage

  return (
    <div className="all-walks">
      <button className="back-button" onClick={onBack}>‹ Back</button>
      <h1>All Walks</h1>

      {walks.length === 0 ? (
        <p className="empty">Your first walk is waiting.</p>
      ) : (
        <div className="walk-list">
          {[...walks].reverse().map((walk) => (
            <WalkCard key={walk.id} walk={walk} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllWalks;
