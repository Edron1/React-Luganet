import { baseApi } from '../../api/baseApi';

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployers: builder.query({
      query: () => '/admin/getEmployers',
      transformResponse: (response) => response.data.all_workers ?? [],
      providesTags: ['Employees'],
    }),
  }),
});

export const { useGetEmployersQuery } = employeesApi;