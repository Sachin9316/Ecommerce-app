import productReducer from "./products/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
