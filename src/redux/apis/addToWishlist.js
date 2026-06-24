import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";

export const getWishlistItems = (wishlistData) => {
  const raw = wishlistData?.data;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.wishlist)) return raw.wishlist;
  if (Array.isArray(raw?.products)) return raw.products;
  if (Array.isArray(raw?.items)) return raw.items;
  return [];
};

const appendWishlistItem = (draft, product_id) => {
  if (!draft || !product_id) return;
  const items = getWishlistItems(draft);
  const exists = items.some(
    (item) => (item?.product?.id ?? item?.product_id ?? item?.id) === product_id,
  );
  if (exists) return;

  const entry = { product_id, id: product_id };
  if (Array.isArray(draft?.data)) {
    draft?.data?.push(entry);
  } else if (draft?.data && typeof draft?.data === "object") {
    if (!Array.isArray(draft?.data?.wishlist)) draft.data.wishlist = [];
    draft?.data?.wishlist?.push(entry);
  } else {
    draft.data = [entry];
  }
};

const addToWishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");

        return {
          url: "/add-to-wishlist",
          method: "POST",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
            "Content-Type": "application/json",
          },
          body,
        };
      },
      async onQueryStarted({ body }, { dispatch, queryFulfilled, getState }) {
        const userId = body?.user_id;
        const productId = body?.product_id;
        let patchResult;

        if (userId && productId) {
          const cached = addToWishlistApi.endpoints.getWishlist.select(userId)(
            getState(),
          );
          if (cached?.data !== undefined) {
            patchResult = dispatch(
              addToWishlistApi.util.updateQueryData(
                "getWishlist",
                userId,
                (draft) => appendWishlistItem(draft, productId),
              ),
            );
          } else {
            dispatch(
              addToWishlistApi.util.upsertQueryData("getWishlist", userId, {
                data: [{ product_id: productId, id: productId }],
              }),
            );
          }
        }

        try {
          await queryFulfilled;
        } catch {
          patchResult?.undo?.();
        }
      },
      invalidatesTags: [
        "getWishlist",
        "home",
        "products",
        "ProductsByCategory",
        "ProductsBySubCategory",
        "product",
        "SearchProducts",
      ],
    }),

    getWishlist: builder.query({
      query: (userId) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/get-wishlist?user_id=${userId}`,
          method: "GET",
          headers: {
            ...(userToken && {
              Authorization: `Bearer ${userToken}`,
            }),
          },
        };
      },
      providesTags: ["getWishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ body }) => {
        const userToken = Cookies.get("userToken");
        return {
          url: `/remove-wishlist-item`,
          method: "POST",
          headers: {
            ...(userToken && { Authorization: `Bearer ${userToken}` }),
            "Content-Type": "application/json",
          },
          body: body,
        };
      },
      invalidatesTags: [
        "getWishlist",
        "home",
        "products",
        "ProductsByCategory",
        "ProductsBySubCategory",
        "product",
        "SearchProducts",
      ],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = addToWishlistApi;
