import { createSlice } from '@reduxjs/toolkit';

const ROLE_PRIORITY = ['admin', 'seller', 'client'];

const getPrimaryRole = (user) => {
  const roles = user?.roles?.map((r) => r.name) ?? [];
  return ROLE_PRIORITY.find((r) => roles.includes(r)) ?? 'client';
};

const persisted = {
  token: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  role: localStorage.getItem('role'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: persisted.token,
    refreshToken: persisted.refreshToken,
    user: persisted.user,
    role: persisted.role,
    isAuthenticated: !!persisted.token,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, refreshToken, user } = action.payload;

      state.token = token;
      if (refreshToken) state.refreshToken = refreshToken;

      if (user) {
        state.user = user;
        state.role = getPrimaryRole(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', state.role);
      }

      state.isAuthenticated = true;

      localStorage.setItem('access_token', token);
      if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (s) => s.auth;
export const selectToken = (s) => s.auth.token;
export const selectRefreshToken = (s) => s.auth.refreshToken;
export const selectRole = (s) => s.auth.role;