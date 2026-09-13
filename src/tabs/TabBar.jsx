import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/',      icon: '🚶', label: 'Walk' },
  { to: '/log',   icon: '➕', label: 'Log' },
  { to: '/stats', icon: '📈', label: 'Stats' },
];

function TabBar() {
  return (
    <nav className="tab-bar">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default TabBar;
