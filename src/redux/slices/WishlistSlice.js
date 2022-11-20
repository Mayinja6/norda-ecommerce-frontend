import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addProductToWishListAction: (state, action) => {
      let productQty = action.payload.qty || 1;

      state.wishlistItems.push({ ...action.payload, qty: productQty });
    },
    removeProductFromWishlistAction: (state, action) => {
      let remainingItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      state.wishlistItems = remainingItems;
    },
  },
});

export const { addProductToWishListAction, removeProductFromWishlistAction } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
