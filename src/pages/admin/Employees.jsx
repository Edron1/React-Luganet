import { useGetEmployersQuery } from '../../features/employees/employeesApi';

export default function Employees() {
  const { data: employees, isLoading, isError, error, refetch } =
    useGetEmployersQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Сотрудники</h1>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10
                     text-slate-300 text-sm transition"
        >
          Обновить
        </button>
      </div>

      {isLoading && (
        <p className="text-slate-400">Загрузка...</p>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300
                        rounded-xl px-4 py-3">
          Ошибка загрузки: {error?.status ?? 'неизвестно'}
        </div>
      )}

      {employees && employees.length === 0 && (
        <p className="text-slate-400">Сотрудников нет</p>
      )}

      {employees && employees.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-slate-200">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="text-left px-4 py-3 font-medium">ID</th>
                <th className="text-left px-4 py-3 font-medium">Имя</th>
                <th className="text-left px-4 py-3 font-medium">Статус</th>
                <th className="text-left px-4 py-3 font-medium">Создан</th>
                <th className="text-right px-4 py-3 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3 text-slate-400">#{emp.id}</td>
                  <td className="px-4 py-3 text-white font-medium">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3">
                    {emp.is_active ? (
                      <span className="text-emerald-400">Активен</span>
                    ) : (
                      <span className="text-slate-500">Отключён</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {formatDate(emp.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-lg text-xs
                                 bg-red-500/10 text-red-300
                                 opacity-50 cursor-not-allowed"
                      title="Скоро"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}