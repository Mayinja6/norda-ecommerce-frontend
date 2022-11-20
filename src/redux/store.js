import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./slices/AuthSlice";
import ProductsReducer from "./slices/ProductsSlice";
import CartReducer from "./slices/CartSlice";
import WishlistReducer from "./slices/WishlistSlice";
import OrderReducer from "./slices/OrderSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductsReducer,
    cart: CartReducer,
    wishlist: WishlistReducer,
    order: OrderReducer,
  },
});
