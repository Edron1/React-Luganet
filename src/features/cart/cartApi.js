import { baseApi } from '../../api/baseApi';

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      transformResponse: (response) => response.data?.Cart ?? [],
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation({
      query: ({ offerId, quantity }) => ({
        url: '/addToCart',
        method: 'POST',
        body: {
          offer_id: offerId,
          quantity,
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation({
      query: ({ offerId, quantity }) => ({
        url: '/removeFromCart',
        method: 'POST',
        body: {
          offer_id: offerId,
          quantity,
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;