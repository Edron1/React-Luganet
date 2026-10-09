import { baseApi } from '../../api/baseApi';

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: '/account/password',
        method: 'PATCH',
        body: {
          old_password: oldPassword,
          new_password: newPassword,
        },
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = accountApi;