import { PRODUCTS } from "@/apis/Products/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  productDetail: {},
  loading: false,
  error: null,
  cartData: [],
};

export const fetchAllProducts = createAsyncThunk("fetch/products", async () => {
  try {
    const response = await fetch(`${PRODUCTS.getAllProducts}`);
    const data = await response.json();
    return data?.products;
  } catch (error: any) {
    throw Error(error.message || "Failed to fetch products");
  }
});

export const fetchAllCategories = createAsyncThunk(
  "fetch/categories",
  async () => {
    try {
      const response = await fetch(`${PRODUCTS.getAllCategory}`);
      const data = await response.json();
      return data?.categories;
    } catch (error: any) {
      throw Error(error.message || "Failed to fetch categories");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "fetch/productById",
  async (id: number) => {
    try {
      const response = await fetch(`${PRODUCTS.getProductById(id)}`);
      const data = await response.json();
      return data?.product;
    } catch (error: any) {
      throw Error(error.message || "Failed to fetch product");
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "fetch/categoryById",
  async (type: string) => {
    try {
      const response = await fetch(`${PRODUCTS.getCategoryById(type)}`);
      const data = await response.json();
      return data?.products;
    } catch (error: any) {
      throw Error(error.message || "Failed to fetch category by Type");
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
    resetProductDetails: (state) => {
      state.productDetail = initialState.productDetail;
    },
    addCartData: (state, action) => {
      const data: any = action?.payload;
      state.cartData.push(data);
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
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  getAllProduct,
  resetProductDetails,
  addCartData,
  removeCartData,
} = productSlice.actions;
export default productSlice.reducer;
