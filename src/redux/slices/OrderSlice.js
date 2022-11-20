import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reduxFuncs from "../reduxFuncs";

const initialState = {
  order: null,
  ordersList: [],
  orderPending: false,
  orderSuccess: false,
  orderFailed: false,
  orderMessage: "",
};

export const createAnOrderAction = createAsyncThunk(
  "order/create",
  async (order, thunkAPI) => {
    try {
      return reduxFuncs.createAnOrderCli(order);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const getAllUserOrders = createAsyncThunk("orders/mine", async () => {
  return reduxFuncs.getUserOrdersCli();
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderStateReset: (state) => {
      state.orderSuccess = false;
      state.orderFailed = false;
      state.orderMessage = "";
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAnOrderAction.pending, (state) => {
        state.orderPending = true;
      })
      .addCase(createAnOrderAction.rejected, (state, action) => {
        state.orderPending = false;
        state.orderFailed = true;
        state.orderMessage = action.payload || action.error.message;
      })
      .addCase(createAnOrderAction.fulfilled, (state, action) => {
        state.orderPending = false;
        state.orderSuccess = true;
        state.order = action.payload;
      })

      .addCase(getAllUserOrders.pending, (state) => {
        state.orderPending = true;
      })
      .addCase(getAllUserOrders.rejected, (state, action) => {
        state.orderPending = false;
        state.orderFailed = true;
        state.orderMessage = action.error.message;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.orderPending = false;
        state.orderSuccess = true;
        state.ordersList = action.payload;
      });
  },
});

export const { orderStateReset } = orderSlice.actions;
export default orderSlice.reducer;
