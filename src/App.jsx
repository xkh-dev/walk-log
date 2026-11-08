import { Routes, Route, useLocation } from 'react-router-dom';
import Walk from './pages/Walk';
import LogForm from './pages/LogForm';
import Stats from './pages/Stats';
import Account from './pages/Account';
import TabBar from './components/TabBar';
import AllWalks from './pages/AllWalks';
import WalksProvider from './lib/WalksProvider';
import './theme.css';
import './App.css';

function App() {
  const location = useLocation();
  const showTabBar = ['/', '/stats'].includes(location.pathname);

  return (
    <WalksProvider>
      <div className="app">
        <main className="page">
          <Routes>
            <Route path="/" element={<Walk />} />
            <Route path="/log" element={<LogForm />} />
            <Route path="/log/:id" element={<LogForm />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/account" element={<Account />} />
            <Route path="/walks" element={<AllWalks />} />
          </Routes>
        </main>
        {showTabBar && <TabBar />}
      </div>
    </WalksProvider>
  );
}

export default App;
