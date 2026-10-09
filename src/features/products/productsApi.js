import { baseApi } from '../../api/baseApi';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      transformResponse: (response) => response.data.products ?? [],
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,              // ← вот эта строка
      transformResponse: (response) => response.data.product,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi;