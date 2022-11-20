import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, Header } from "./components";
import {
  About,
  Account,
  Auth,
  Cart,
  Checkout,
  Contact,
  CreateAProduct,
  Hero,
  PrivacyPolicy,
  ProductDetails,
  ProductList,
  UpdateAProduct,
  Wishlist,
} from "./views";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/*" element={<Hero />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId/*" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/account/*"
          element={!user ? <Navigate to={"/auth/signin"} /> : <Account />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/auth/*"
          element={user ? <Navigate to={"/account"} /> : <Auth />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/new-product"
          element={
            !user ? <Navigate to={"/auth/signin"} /> : <CreateAProduct />
          }
        />
        <Route
          path="/products/update/:productId/*"
          element={
            !user ? <Navigate to={"/auth/signin"} /> : <UpdateAProduct />
          }
        />
        <Route
          path="/checkout/*"
          element={!user ? <Navigate to={"/auth/signin"} /> : <Checkout />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
