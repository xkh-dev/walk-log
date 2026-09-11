const TABS = [
  { id: 'walk', icon: '🚶', label: 'Walk' },
  { id: 'log',  icon: '➕', label: 'Log' },
  { id: 'stats', icon: '📈', label: 'Stats' },
];

function TabBar({ active, onChange }) {
  return (
    <nav className="tab-bar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? 'tab active' : 'tab'}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default TabBar;
