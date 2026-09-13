import { Routes, Route, useLocation } from 'react-router-dom';
import Walk from './tabs/Walk';
import LogForm from './tabs/LogForm';
import Stats from './tabs/Stats';
import TabBar from './tabs/TabBar';
import AllWalks from './components/AllWalks';
import './theme.css';
import './App.css';

function App() {
  const location = useLocation();
  const showTabBar = ['/', '/stats'].includes(location.pathname);

  return (
    <div className="app">
      <main className="page">
        <Routes>
          <Route path="/" element={<Walk />} />
          <Route path="/log" element={<LogForm />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/walks" element={<AllWalks />} />
        </Routes>
      </main>
      {showTabBar && <TabBar />}
    </div>
  );
}

export default App;
