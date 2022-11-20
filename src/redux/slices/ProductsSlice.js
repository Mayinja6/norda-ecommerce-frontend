import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reduxFuncs from "../reduxFuncs";

const initialState = {
  products: [],
  productsSuccess: false,
  productsPending: false,
  productsFailed: false,
  productsMessage: "",
  productDetails: null,
};

export const getAllServerProducts = createAsyncThunk(
  "products/all",
  async () => {
    return await reduxFuncs.fetchAllServerProductsCli();
  }
);

export const createAProductAction = createAsyncThunk(
  "products/create",
  async (productForm, thunkAPI) => {
    try {
      return await reduxFuncs.createAServerProductCli(productForm);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const fetchAProductByIdAction = createAsyncThunk(
  "products/Id",
  async (productId, thunkAPI) => {
    try {
      return await reduxFuncs.getAProductByIdCli(productId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const updateAProductByIdAction = createAsyncThunk(
  "products/update",
  async (updateProductForm, thunkAPI) => {
    try {
      return await reduxFuncs.updateAProductByIdCli(updateProductForm);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const reviewAProductByIdAction = createAsyncThunk(
  "products/review",
  async (reviewInfo, thunkAPI) => {
    try {
      return await reduxFuncs.reviewAProductCli(reviewInfo);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const deleteAProductByIdAction = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      return await reduxFuncs.deleteAProductByItsIdCli(productId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsStateReset: (state) => {
      state.newCreated = false;
      state.newReview = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServerProducts.pending, (state) => {
        state.productsPending = true;
      })
      .addCase(getAllServerProducts.rejected, (state, action) => {
        state.productsPending = false;
        state.productsFailed = true;
        state.productsMessage = action.error.message;
      })
      .addCase(getAllServerProducts.fulfilled, (state, action) => {
        let cats = action.payload.map((item) => item.category);
        state.productsPending = false;
        state.productsSuccess = true;
        state.products = action.payload;
        state.categories = [
          "All",
          ...cats.filter((item, i) => {
            return cats.indexOf(item) === i;
          }),
        ];
      })

      .addCase(createAProductAction.pending, (state) => {
        state.productsPending = true;
      })
      .addCase(createAProductAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsPending = false;
        state.productsSuccess = true;
        state.newCreated = true;
      })
      .addCase(createAProductAction.rejected, (state, action) => {
        state.productsFailed = true;
        state.productsPending = false;
        state.productsMessage = action.payload || action.error.message;
      })

      .addCase(fetchAProductByIdAction.pending, (state) => {
        state.productsPending = true;
      })
      .addCase(fetchAProductByIdAction.rejected, (state, action) => {
        state.productsPending = false;
        state.productsFailed = true;
        state.productsMessage = action.payload || action.error.message;
      })
      .addCase(fetchAProductByIdAction.fulfilled, (state, action) => {
        state.productsPending = false;
        state.productsSuccess = true;
        state.productDetails = action.payload;
      })

      .addCase(updateAProductByIdAction.pending, (state) => {
        state.productsPending = true;
      })
      .addCase(updateAProductByIdAction.rejected, (state, action) => {
        state.productsPending = false;
        state.updateFailed = true;
        state.productsMessage = action.payload || action.error.message;
      })
      .addCase(updateAProductByIdAction.fulfilled, (state, action) => {
        state.productsSuccess = true;
        state.productsPending = false;
        state.products = action.payload;
        state.newCreated = true;
      })

      .addCase(reviewAProductByIdAction.pending, (state) => {
        state.productsPending = true;
      })
      .addCase(reviewAProductByIdAction.rejected, (state, action) => {
        state.productsMessage = action.payload || action.error.message;
        state.productsPending = false;
        state.productsFailed = true;
      })
      .addCase(reviewAProductByIdAction.fulfilled, (state, action) => {
        state.productsPending = false;
        state.productsSuccess = true;
        state.products = action.payload;
        state.newCreated = true;
      })

      .addCase(deleteAProductByIdAction.pending, (state) => {
        state.productsPending = true;
        state.productsSuccess = false;
      })
      .addCase(deleteAProductByIdAction.fulfilled, (state, action) => {
        state.productsPending = false;
        window.location.assign("/");
      })
      .addCase(deleteAProductByIdAction.rejected, (state, action) => {
        state.productsPending = false;
        state.productsMessage = action.payload || action.error.message;
        state.productsFailed = true;
      });
  },
});

export const { productsStateReset } = productsSlice.actions;
export default productsSlice.reducer;
