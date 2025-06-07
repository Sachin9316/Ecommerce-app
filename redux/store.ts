import productReducer from "./products/productSlice";
import cartReducer from "./carts/cartSlice";
import recentReducer from "./recent/recentSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    recent: recentReducer,
  },
});
