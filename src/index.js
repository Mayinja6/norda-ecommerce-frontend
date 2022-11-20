import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import App from "./App";
import { ScrollToTopParams, ScrollToTopBtn } from "./utils/ScrollToTop";
import { store } from "./redux/store";
import { getAllServerProducts } from "./redux/slices/ProductsSlice";

// CSS
import "./index.css";
// Swiper Styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./assets/css/Simple-Line-Icons/simple-line-icons.css";

store.dispatch(getAllServerProducts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTopParams />
        <App />
        <ScrollToTopBtn />
      </BrowserRouter>
    </ToastProvider>
  </Provider>
);
