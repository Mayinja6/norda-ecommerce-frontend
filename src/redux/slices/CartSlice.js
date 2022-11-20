import { createSlice } from "@reduxjs/toolkit";

let cartItems = JSON.parse(localStorage.getItem("cartItems"));
let shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
let paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cartItems || [],
    shippingAddress: shippingAddress || {
      address: "",
      city: "",
      zipCode: "",
    },
    paymentMethod: paymentMethod || "",
  },
  reducers: {
    addProductToCartAction: (state, action) => {
      let productQty = action.payload.qty || 1;

      state.cartItems.push({ ...action.payload, qty: productQty });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeProductFromCartAction: (state, action) => {
      let remainingItems = state.cartItems.filter(
        (product) => product._id !== action.payload
      );
      state.cartItems = remainingItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementCartProductQtyAction: (state, action) => {
      let item = state.cartItems.find((item) => item._id === action.payload);

      if (item.qty === 1) {
        item.qty = 1;
      } else {
        item.qty--;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementCartProductQtyAction: (state, action) => {
      let item = state.cartItems.find((item) => item._id === action.payload);

      if (item.qty === item.countInStock) {
        item.qty = item.countInStock;
      } else {
        item.qty++;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearShoppingCartProductsAction: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    saveShippingAddressAction: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethodAction: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
    orderSuccessfullyPlacedAction: (state) => {
      state.paymentMethod = "";
      state.cartItems = [];
      state.shippingAddress = {
        address: "",
        city: "",
        zipCode: "",
      };
      localStorage.removeItem("paymentMethod");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: () => {},
});

export const {
  addProductToCartAction,
  removeProductFromCartAction,
  incrementCartProductQtyAction,
  decrementCartProductQtyAction,
  clearShoppingCartProductsAction,
  saveShippingAddressAction,
  savePaymentMethodAction,
  orderSuccessfullyPlacedAction,
} = cartSlice.actions;
export default cartSlice.reducer;
