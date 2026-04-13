import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Tasks' },
  { to: '/archive', label: 'Archive' },
  { to: '/settings', label: 'Settings' },
] as const;

export default function Layout() {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-left">
          <NavLink to="/" className="site-name">Parallel</NavLink>
          <span className="site-tagline">task orchestration</span>
        </div>

        <nav className="site-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>Parallel v1.0</span>
        <span>Local</span>
      </footer>
    </div>
  );
}
