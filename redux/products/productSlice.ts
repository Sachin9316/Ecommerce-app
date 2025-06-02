import { PRODUCTS } from "@/apis/Products/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productDetail: {},
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk("fetch/products", async () => {
  try {
    const response = await fetch(`${PRODUCTS.getAllProducts}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw Error(error.message || "Failed to fetch products");
  }
});

export const fetchProductById = createAsyncThunk(
  "fetch/productById",
  async (id: number) => {
    try {
      const response = await fetch(`${PRODUCTS.getProductById(id)}`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw Error(error.message || "Failed to fetch product");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getAllProduct } = productSlice.actions;
export default productSlice.reducer;
