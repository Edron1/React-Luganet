import { useState } from 'react';
import { useChangePasswordMutation } from '../features/account/accountApi';

export default function ChangePasswordModal({ onClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (newPassword === oldPassword) {
      setError('Новый пароль совпадает со старым');
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      setSuccess(true);
      setTimeout(onClose, 1500); // закроется через 1.5 сек
    } catch (err) {
      const status = err?.status;
      if (status === 401 || status === 422) {
        setError('Неверный текущий пароль');
      } else if (status === 'FETCH_ERROR') {
        setError('Сервер недоступен');
      } else {
        setError('Не удалось сменить пароль');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border-t sm:border border-white/10
                   sm:rounded-2xl rounded-t-3xl p-5 animate-slide-up"
        style={{ backgroundColor: '#0d1228' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ручка для свайпа вниз (визуальная) */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5 sm:hidden" />

        <h2 className="text-xl font-bold text-white mb-5">
          Смена пароля
        </h2>

        {success ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-emerald-400 font-medium">Пароль успешно изменён</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="Текущий пароль"
              value={oldPassword}
              onChange={setOldPassword}
            />
            <Field
              label="Новый пароль"
              value={newPassword}
              onChange={setNewPassword}
            />
            <Field
              label="Повторите новый пароль"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            {error && (
              <div className="text-sm text-red-300 bg-red-500/10
                              border border-red-500/30 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10
                           text-slate-300 font-medium transition"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700
                           text-white font-medium transition
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete="off"
        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5
                   text-white placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition"
      />
    </div>
  );
}