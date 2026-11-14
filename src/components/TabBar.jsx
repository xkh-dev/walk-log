import { NavLink } from 'react-router-dom';
import { t } from '../strings';

const TABS = [
  { to: '/',      icon: '🚶', label: 'tabs.walk' },
  { to: '/log',   icon: '➕', label: 'tabs.log' },
  { to: '/stats', icon: '📈', label: 'tabs.stats' },
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
          <span className="tab-label">{t(tab.label)}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default TabBar;
