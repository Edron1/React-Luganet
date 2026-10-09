import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectRole } from '../features/auth/authSlice';

import Login from '../pages/Login';
import Dashboard from '../pages/admin/Dashboard';
import Welcome from '../pages/admin/Welcome';
import Employees from '../pages/admin/Employees';
import ProtectedRoute from './ProtectedRoute';

import EmployeeLayout from '../layouts/EmployeeLayout';
import Catalog from '../pages/employee/Catalog';
import Orders from '../pages/employee/Orders';
import Profile from '../pages/employee/Profile';
import Cart from '../pages/employee/Cart';
import ProductDetail from '../pages/employee/ProductDetail';

const ROLE_HOME = {
  admin: '/admin',
  seller: '/employee',
  client: '/client',
};

function HomeRedirect() {
  const role = useAppSelector(selectRole);
  if (!role) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[role] ?? '/login'} replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Welcome />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Catalog />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}