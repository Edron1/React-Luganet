import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  const [employeesOpen, setEmployeesOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex text-slate-200"
      style={{ backgroundColor: '#131a37' }}
    >
      {/* Сайдбар */}
      <aside
        className="w-64 shrink-0 py-4"
        style={{ backgroundColor: '#0d1228' }}
      >
        <div className="px-5 mb-6 text-xl font-bold text-white">SCOREN</div>

        <nav className="space-y-1">
          {/* Раскрывающийся пункт */}
          <div className="mx-2">
            <button
              type="button"
              onClick={() => setEmployeesOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                         hover:bg-white/5 transition text-slate-300"
            >
              <span className="text-sm font-medium">Сотрудники</span>
              <span
                className={`text-xs transition-transform ${
                  employeesOpen ? 'rotate-90' : ''
                }`}
              >
                ▶
              </span>
            </button>

            {employeesOpen && (
              <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-0.5">
                <NavLink
                  to="/admin/employees"
                  end
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition hover:bg-white/5 ${
                      isActive ? 'bg-white/10 text-white' : 'text-slate-400'
                    }`
                  }
                >
                  Список сотрудников
                </NavLink>
                <NavLink
                  to="/admin/employees/add"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition hover:bg-white/5 ${
                      isActive ? 'bg-white/10 text-white' : 'text-slate-400'
                    }`
                  }
                >
                  Добавить сотрудника
                </NavLink>
              </div>
            )}
          </div>

          {/* Обычный пункт */}
          <NavLink
            to="/admin/test"
            className={({ isActive }) =>
              `block mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition
               hover:bg-white/5
               ${isActive ? 'bg-white/10 text-white' : 'text-slate-300'}`
            }
          >
            Тестовый пункт
          </NavLink>
        </nav>
      </aside>

      {/* Правая часть */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}