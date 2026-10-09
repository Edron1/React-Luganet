import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectAuth, logout } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApi';
import ChangePasswordModal from '../../components/ChangePasswordModal';

export default function Profile() {
  const { user, role, refreshToken } = useAppSelector(selectAuth);
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken).unwrap();
      }
    } catch (err) {
      console.warn('logout api failed', err);
    } finally {
      dispatch(logout());
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Профиль</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
        <p className="text-slate-400 text-sm mb-1">Имя</p>
        <p className="text-white">{user?.name}</p>

        <p className="text-slate-400 text-sm mt-3 mb-1">Роль</p>
        <p className="text-blue-400">{role}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="w-full py-3 rounded-xl bg-sky-600 hover:bg-white/10
                     text-slate-200 font-medium transition
                     border border-white/10"
        >
          Сменить пароль
        </button>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700
                     text-white font-medium transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? 'Выход...' : 'Выйти'}
        </button>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
    </div>
  );
}