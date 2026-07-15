import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/slices/userSlice";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "./apiSlice";
import categorySlice from "./slices/categorySlice";

const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      category: categorySlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  return store;
};

export const storeWrapper = createWrapper(makeStore);
