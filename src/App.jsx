import { Routes, Route, useLocation } from 'react-router-dom';
import Walk from './tabs/Walk';
import LogForm from './tabs/LogForm';
import Stats from './tabs/Stats';
import TabBar from './tabs/TabBar';
import AllWalks from './components/AllWalks';
import './theme.css';
import './App.css';

import { useEffect } from 'react'
import { supabase } from './supabase'

function App() {
  const location = useLocation();
  const showTabBar = ['/', '/stats'].includes(location.pathname);

  useEffect(() => {
  supabase.from('walks').select('*').then(({ data, error }) => {
    console.log('walks:', data, 'error:', error)
  })
}, [])

async function testInsert() {
  const { data, error } = await supabase
    .from('walks')
    .insert({ date: '2026-10-31', duration: 45, where_type: 'park' })
    .select()
  console.log('inserted:', data, 'error:', error)
}
  return (
    <div className="app">
    <button onClick={testInsert}>Test insert</button>
      <main className="page">
        <Routes>
          <Route path="/" element={<Walk />} />
          <Route path="/log" element={<LogForm />} />
          <Route path="/log/:id" element={<LogForm />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/walks" element={<AllWalks />} />
        </Routes>
      </main>
      {showTabBar && <TabBar />}
    </div>
  );
}

export default App;
