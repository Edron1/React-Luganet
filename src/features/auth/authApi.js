import { baseApi } from '../../api/baseApi';
import { setCredentials } from './authSlice';

const normalizeAuth = (response) => {
  if (response?.error) {
    throw new Error(response.error.message || 'Server error');
  }
  const payload = response.data;
  return {
    token: payload.token ?? payload.access_token,
    refreshToken: payload.refresh_token,
    user: payload.user,           // при refresh его нет — будет undefined
    expiresIn: payload.expires_in,
  };
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: normalizeAuth,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({
            token: data.token,
            refreshToken: data.refreshToken,
            user: data.user,
          }));
        } catch {}
      },
    }),

    refresh: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refresh_token: refreshToken },
      }),
      transformResponse: normalizeAuth,
    }),

    logout: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { refresh_token: refreshToken },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;