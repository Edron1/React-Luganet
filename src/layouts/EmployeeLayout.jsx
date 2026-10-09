import { NavLink, Outlet } from 'react-router-dom';
import CartFloatingBar from '../components/CartFloatingBar';
import { useLocation } from 'react-router-dom';

const TABS = [
  { to: '/employee',         label: 'Каталог', icon: '🛒', end: true },
  { to: '/employee/orders',  label: 'Заказы',  icon: '📋' },
  { to: '/employee/profile', label: 'Профиль', icon: '👤' },
];

export default function EmployeeLayout() {
  const location = useLocation();
  const hideTabBar = location.pathname.startsWith('/employee/product/');

  return (
    <div
      className="min-h-screen flex flex-col text-slate-200"
      style={{ backgroundColor: '#131a37' }}
    >
      <main className={`flex-1 ${hideTabBar ? 'pb-4' : 'pb-20'}`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <Outlet />
        </div>
      </main>

      {!hideTabBar && location.pathname !== '/employee/cart' && (
        <CartFloatingBar />
      )}

      {!hideTabBar && (
        <nav
          className="fixed bottom-0 left-0 right-0 border-t border-white/10
                     flex justify-around py-2 z-10"
          style={{ backgroundColor: 'rgba(13,18,40,0.98)' }}
        >
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-5 py-1 text-xs transition
                 ${isActive ? 'text-blue-400' : 'text-slate-400'}`
              }
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}