import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectToken, selectRole } from '../features/auth/authSlice';

export default function ProtectedRoute({ allowedRoles }) {
  const token = useAppSelector(selectToken);
  const role = useAppSelector(selectRole);

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}