import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  cartItemCount: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartData: (state, action) => {
      const data: any = action?.payload;
      console.log({
        data,
      });
      state.cartData.push(data);
      state.cartItemCount.push(data);
    },
    removeCartData: (state, action) => {
      const id = action.payload;
      const removedData = state.cartData.filter(
        (remove: any) => remove.id !== id
      );
      console.log({
        id,
      });
      state.cartData = removedData;
      state.cartItemCount = removedData;
    },
    addMoreItem: (state, action) => {
      const itemDetails = action.payload;
      const updatedArray = state.cartItemCount?.map((item: any) => {
        if (item?.id === itemDetails) {
          return {
            ...item,
            count: item?.count + 1,
          };
        }
        return item;
      });

      state.cartItemCount = updatedArray;
    },
    removeItem: (state, action) => {
      const itemDetails = action.payload;
      const updatedArray = state.cartItemCount?.map((item: any) => {
        if (item?.id === itemDetails) {
          return {
            ...item,
            count: item?.count - 1,
          };
        }
        return item;
      });

      state.cartItemCount = updatedArray;
    },
  },
});

export const { addCartData, removeCartData, addMoreItem, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
