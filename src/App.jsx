import { useState } from 'react';
import Walk from './tabs/Walk';
import LogForm from './tabs/LogForm';
import Stats from './tabs/Stats';
import TabBar from './tabs/TabBar';
import AllWalks from './components/AllWalks';
import './theme.css';
import './App.css';


function App() {
  const [activeTab, setActiveTab] = useState('walk'); // start on the Walk (home) tab
  const [showAllWalks, setShowAllWalks] = useState(false);

  function changeTab(id) {
    setShowAllWalks(false); // leave the sub-page when switching tabs
    setActiveTab(id);
  }
  
  return (
    <div className="app">
      <main className="page">
        {showAllWalks ? (
          <AllWalks onBack={() => setShowAllWalks(false)} />
        ) : (
          <>
            {activeTab === 'walk'  && <Walk onSeeAll={() => setShowAllWalks(true)} />}
            {activeTab === 'log'   && <LogForm />}
            {activeTab === 'stats' && <Stats />}
          </>
        )}
      </main>
      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default App;
