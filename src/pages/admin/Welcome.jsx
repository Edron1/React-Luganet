import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectAuth, logout } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApi';

export default function Welcome() {
  const { user, role, refreshToken } = useAppSelector(selectAuth);
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logoutApi(refreshToken).unwrap();
      }
    } catch (err) {
      // Бэк не ответил / ошибка — всё равно выходим локально
      console.warn('logout api failed', err);
    } finally {
      dispatch(logout());
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-2">
        Добро пожаловать, {user?.name}
      </h1>
      <p className="text-slate-400 mb-6">
        Ваша роль: <span className="text-blue-400 font-medium">{role}</span>
      </p>

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700
                   text-white text-sm font-medium transition
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Выход...' : 'Выйти'}
      </button>
    </div>
  );
}