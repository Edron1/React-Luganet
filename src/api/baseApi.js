import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

let refreshPromise = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (!result.error && result.data?.error?.code) {
    result = {
      error: {
        status: result.data.error.code,
        data: result.data,
      },
    };
  }
  const isAuthError =
    result.error?.status === 401 ||
    result.error?.status === 410 ||
    result.error?.status === 'FETCH_ERROR';

  if (isAuthError) {
    const refreshToken = api.getState().auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    if (!refreshPromise) {
      refreshPromise = rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refresh_token: refreshToken },
        },
        api
      )
        .then((refreshResult) => {
          const payload = refreshResult.data?.data;
          if (payload?.access_token) {
            api.dispatch(
              setCredentials({
                token: payload.access_token,
                refreshToken: payload.refresh_token,
              })
            );
            return true;
          }
          api.dispatch(logout());
          return false;
        })
        .catch(() => {
          api.dispatch(logout());
          return false;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);

      if (!result.error && result.data?.error?.code) {
        result = {
          error: {
            status: result.data.error.code,
            data: result.data,
          },
        };
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Employees', 'Reports', 'Products', 'Cart'],
  endpoints: () => ({}),
});