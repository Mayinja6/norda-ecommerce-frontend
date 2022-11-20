import { Rating } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Thumbs } from "swiper";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCartAction } from "../redux/slices/CartSlice";
import { addProductToWishListAction } from "../redux/slices/WishlistSlice";
import {
  Playstore,
  Appstore,
  Iphone12,
  Mouse,
  AirPods,
  Camera,
  Playstation,
} from "../assets";
import { LoaderAnim } from "../components";

function HeroProduct({ product }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  return (
    <>
      <div className="heroProduct p-4 border border-transparent hover:border-primary_clr rounded-lg hover:border-opacity-40 transition-all mb-[25px]">
        <div className="HeroProductImg">
          <Link
            to={`/products/${product._id}`}
            className="h-[150px] flex items-center justify-center"
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${product.image.filename}`}
              alt=""
              className="max-w-full max-h-full"
            />
          </Link>
        </div>
        <div className="heroProductContent py-0 pr-[10px] md:pr-[15px] pl-[10px] md:pl-[25px]">
          <span className="text-[12px] text-[#999] uppercase block">
            {product.brand}
          </span>

          <h4 className="text-[12px] sm:text-[14px] font-semibold leading-[20px] mt-1 mx-0 mb-[6px] md:mb-[14px] max-h-16 overflow-hidden">
            <Link
              to={`/products/${product._id}`}
              className="text-black transition-all hover:text-primary_clr"
            >
              {product.title}
            </Link>
          </h4>
          <div className="mb-[8px] md:mb-[24px] flex items-center">
            <Rating
              readOnly
              value={product.rating}
              size={"small"}
              precision={0.1}
            />
            <span className="text-[12px] text-[#999] uppercase ml-[7px]">
              ({product.numReviews})
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-[16px] text-primary_clr uppercase block font-semibold">
                ${product.price}
              </span>
              {product.oldPrice > 0 && (
                <span className="text-[#999] line-through text-[14px] ml-[10px]">
                  ${product.oldPrice}
                </span>
              )}
            </div>
            <div className="productActions flex">
              {wishlistItems.find((item) => item._id === product._id) ? (
                <></>
              ) : (
                <button
                  className="bg-transparent border-none p-0 text-[17px] text-[#222] hover:text-primary_clr mr-[10px]"
                  onClick={() =>
                    dispatch(
                      addProductToWishListAction({
                        _id: product._id,
                        title: product.title,
                        price: product.price,
                        image: product.image.filename,
                        countInStock: product.countInStock,
                      })
                    )
                  }
                >
                  <i className="icon-heart font-semibold"></i>
                </button>
              )}
              {cartItems.find((item) => item._id === product._id) ? (
                <></>
              ) : (
                <>
                  <button
                    className="bg-transparent border-none p-0 text-[17px] text-[#222] hover:text-primary_clr"
                    onClick={() =>
                      dispatch(
                        addProductToCartAction({
                          _id: product._id,
                          title: product.title,
                          price: product.price,
                          image: product.image.filename,
                          countInStock: product.countInStock,
                        })
                      )
                    }
                  >
                    <i className="icon-basket-loaded font-semibold"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
      .heroProduct {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        position: relative;
      }
      .heroProduct:before {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        content: "";
        border: 1px solid #bfbfbf;
        -webkit-transition: all .4s ease 0s;
        -o-transition: all .4s ease 0s;
        transition: all .4s ease 0s;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        z-index: 9;
      }
      .HeroProductImg {
        flex: 0 0 37%;
        max-width: 37%;
        position: relative;
      }
      .heroProductContent {
        flex: 0 0 63%;
        max-width: 63%;
        padding: 0 15px 0 25px;
      }
      .productActions {
        opacity: 0;
        visibility: hidden;
        transform: scale(0);
        transition: all .4s ease 0s;
      }
      .heroProduct .productActions {
        opacity: 0;
        visibility: hidden;
        transform: scale(0);
        transition: all .4s ease 0s;
      }
      .heroProduct:hover .productActions {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
      `}</style>
    </>
  );
}

function HeroSlideItem({ badge, title, comment, img }) {
  return (
    <div className="single-hero-slider pt-[40px] pb-[85px] md:py-[75px] w-full">
      <div className="flex flex-col md:flex-row w-full h-[85vh] md:h-[60vh]">
        <div className="w-full h-1/2 md:h-full md:w-[35%] text-center md:text-start md:flex md:justify-center md:flex-col md:ml-[50px] mb-7 md:mb-auto">
          <h5 className="font-bold">{badge}</h5>
          <h1 className="w-3/4 mx-auto md:w-full uppercase font-black text-[24px] md:text-[36px]">
            {title}
          </h1>
          <p className="w-[67%] mx-auto md:mx-0 mb-[15px] md:mb-[30px] mt-0">
            {comment}
          </p>
          <div className="btn-style-1">
            <Link
              className="py-3 px-[20px] inline-block text-[13px] md:text-[15px] lg:text-[16px] font-medium md:font-semibold bg-primary_clr hover:bg-black text-white transition-all"
              to="/products"
            >
              Explore Now
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[75%] h-1/2 md:h-full flex items-center justify-center">
          <img className="max-w-full max-h-full" src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const { pathname } = useLocation();
  const { products, productsSuccess, productsPending, productsFailed } =
    useSelector((state) => state.products);
  return (
    <>
      {productsPending && (
        <>
          <LoaderAnim />
        </>
      )}
      {productsFailed && (
        <>
          <h1>Newtork Error try Again later</h1>
        </>
      )}
      {productsSuccess && (
        <div className="heroSection pb-[30px] md:pb-10">
          <div className="heroSlider bg-transparent">
            <Swiper
              modules={[Navigation, Thumbs, Autoplay]}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              loop={true}
              navigation={true}
              speed={1500}
              effect="cube"
            >
              <SwiperSlide className="px-5 md:px-[50px] lg:px-[100px]">
                <HeroSlideItem
                  img={Iphone12}
                  badge={"Trending"}
                  title={"iPhone 14 Pro 256GB Memory"}
                  comment={`A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life`}
                />
              </SwiperSlide>
              <SwiperSlide className="px-5 md:px-[50px] lg:px-[100px]">
                <HeroSlideItem
                  img={Mouse}
                  badge={"Must Have"}
                  title={"Logitech G-Series Gaming Mouse"}
                  comment={
                    "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience"
                  }
                />
              </SwiperSlide>
              <SwiperSlide className="px-5 md:px-[50px] lg:px-[100px]">
                <HeroSlideItem
                  img={AirPods}
                  badge={"Best Seller"}
                  title={"Apple Grade B Airpods"}
                  comment={
                    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working"
                  }
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="heroServiceArea px-5 md:px-[50px] lg:px-[100px]">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-between items-center border border-[#ebebeb] py-5">
              <div className="flex justify-center items-center my-[30px] sm:border-r sm:selection:border-[#ebebeb]">
                <div className="mr-[25px]">
                  <i className="text-[34px] transition-all icon-cursor text-primary_clr"></i>
                </div>
                <div className="flex items-center justify-center flex-col ">
                  <h3 className="text-lg font-semibold mb-[5px]">
                    Free Shipping
                  </h3>
                  <p className="m-0">Orders over $500</p>
                </div>
              </div>
              <div className="flex justify-center items-center my-[30px] md:border-r md:border-[#ebebeb]">
                <div className="mr-[25px]">
                  <i className="text-[34px] transition-all icon-reload text-primary_clr "></i>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <h3 className="text-lg font-semibold mb-[5px]">
                    Free Returns
                  </h3>
                  <p className="m-0">Within 90 Days</p>
                </div>
              </div>
              <div className="flex justify-center items-center my-[30px] lg:border-r lg:border-[#ebebeb]">
                <div className="mr-[25px]">
                  <i className="text-[34px] transition-all icon-lock text-primary_clr"></i>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <h3 className="text-lg font-semibold mb-[5px]">
                    100% Secure
                  </h3>
                  <p className="m-0">Payment Online</p>
                </div>
              </div>
              <div className="flex justify-center items-center my-[30px]">
                <div className="mr-[25px]">
                  <i className="text-[34px] transition-all icon-tag text-primary_clr"></i>
                </div>
                <div className="flex items-center justify-center flex-col">
                  <h3 className="text-lg font-semibold mb-[5px]">Best Price</h3>
                  <p className="m-0">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="heroAbout px-5 md:px-[50px] lg:px-[100px] pt-[60px] text-center md:pt-[96px]">
            <h3 className="text-[16px] sm:text-[20px] md:text-[24px]  uppercase sm:leading-[26px] md:leading-[24px]">
              Welcome To{" "}
              <span className="font-bold text-primary_clr">norda</span> - one
              stop marketplace ecommerce in uganda!
            </h3>
            <p className="text-[14px] md:text-[16px] sm:w-3/4 mt-2 sm:mx-auto">
              We have over 50K+ products different adaptive your purpose
              shopping
            </p>
          </div>

          <div className="heroCategories px-5 md:px-[50px] lg:px-[100px] pt-[60px] md:pt-[96px]">
            <div className="flex items-center flex-wrap justify-between border-b-[2px] mb-[30px] pb-[15px] md:pb-[30px]">
              <div className="text-[16px] md:text-[24px] uppercase leading-[1]">
                <h2>Popular Categories</h2>
              </div>
              <div className="btn-style-7 btn-style-7-blue">
                <Link
                  to="/products"
                  className="inline-block border-b border-[#666] pb-[2px] leading-[1] text-black hover:border-primary_clr hover:text-primary_clr uppercase"
                >
                  All Products
                </Link>
              </div>
            </div>
            <div className="">
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  376: { slidesPerView: 2 },
                  640: { slidesPerView: 3, spaceBetween: 20 },
                  746: { slidesPerView: 4, spaceBetween: 30 },
                  1024: { slidesPerView: 5, spaceBetween: 40 },
                }}
                autoplay={{ delay: 3000 }}
                speed={850}
                className="flex items-center flex-wrap justify-center gap-8"
              >
                {[
                  { img: Camera, link: "/products", name: "Cameras'" },
                  { img: Mouse, link: "/products", name: "Mouses'" },
                  { img: AirPods, link: "/products", name: "Airpods" },
                  {
                    img: Playstation,
                    link: "/products",
                    name: "Playstations",
                  },
                  { img: Iphone12, link: "/products", name: "Latest Phones" },
                ].map((category, i) => {
                  return (
                    <SwiperSlide
                      key={i}
                      className="heroCategory single-product-wrap flex items-center justify-center flex-col my-5 border border-transparent hover:border-primary_clr hover:border-opacity-40 transition-all rounded-md"
                    >
                      <div className="relative  overflow-hidden max-h-full h-[150px] max-w-full w-[150px] p-2">
                        <Link
                          to={category.link}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={category.img}
                            alt=""
                            className="transition-all block max-w-full max-h-full"
                          />
                        </Link>
                      </div>
                      <div className="text-center mt-[20px]">
                        <h5 className="text-[14px] uppercase m-0 text-black font-semibold">
                          <Link
                            to={category.link}
                            className="inline-block border-b border-transparent hover:border-primary_clr hover:text-primary_clr transition-all"
                          >
                            {category.name}
                          </Link>
                        </h5>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className="heroProducts px-5 md:px-[50px] lg:px-[100px] pt-[60px] md:pt-[96px]">
            <div className="flex flex-wrap justify-between items-center border-b-[2px] mb-[30px] pb-[20px] ">
              <div className="text-[16px] md:text-[24px] uppercase leading-[1]">
                <h2>TRENDING PRODUCTS</h2>
              </div>
              <div className="my-[10px]">
                <Link
                  className={`inline-block hover:text-primary_clr pt-[3px] px-[10px] md:px-[16px] pb-[5px] mr-[5px] rounded-[5px]  ${
                    pathname === "/"
                      ? "font-semibold text-primary_clr bg-[#edf8f7]"
                      : ""
                  }`}
                  to="/"
                >
                  Top 10
                </Link>
                <Link
                  className={`inline-block  hover:text-primary_clr pt-[3px] px-[10px] md:px-[16px] pb-[5px] mr-[5px] rounded-[5px]  ${
                    pathname === "/trend/2"
                      ? "font-semibold text-primary_clr bg-[#edf8f7]"
                      : ""
                  }`}
                  to="/trend/2"
                >
                  Womens
                </Link>
                <Link
                  className={`inline-block  hover:text-primary_clr pt-[3px] px-[10px] md:px-[16px] pb-[5px] mr-[5px] rounded-[5px]  ${
                    pathname === "/trend/3"
                      ? "font-semibold text-primary_clr bg-[#edf8f7]"
                      : ""
                  }`}
                  to="/trend/3"
                >
                  Mens
                </Link>
                <Link
                  className={`inline-block  hover:text-primary_clr pt-[3px] px-[10px] md:px-[16px] pb-[5px] mr-[5px] rounded-[5px] ${
                    pathname === "/trend/4"
                      ? "font-semibold text-primary_clr bg-[#edf8f7]"
                      : ""
                  }`}
                  to="/trend/4"
                >
                  Kids
                </Link>
                <Link
                  className={`inline-block  hover:text-primary_clr pt-[3px] px-[10px] md:px-[16px] pb-[5px] rounded-[5px] ${
                    pathname === "/trend/5"
                      ? "font-semibold text-primary_clr bg-[#edf8f7]"
                      : ""
                  }`}
                  to="/trend/5"
                >
                  Accessories
                </Link>
              </div>
            </div>
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {products.length <= 0 && (
                        <>
                          <h1>No Products SoFar</h1>
                        </>
                      )}
                      <div>
                        {products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-[30px]  p-3">
                              {products.slice(0, 6).map((product, i) => {
                                return (
                                  <HeroProduct key={i} product={product} />
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <Link
                                to="/products"
                                className="inline text-[14px] font-semibold text-primary_clr border border-primary_clr py-3 px-8 transition-all hover:bg-primary_clr hover:text-[#fff]"
                              >
                                More Product
                                <i className="icon-arrow-right ml-2"></i>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/trend/2"
                  element={
                    <>
                      {products.length <= 0 && (
                        <>
                          <h1>No Products SoFar</h1>
                        </>
                      )}
                      <div>
                        {products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-[30px]  p-3">
                              {products.slice(0, 6).map((product, i) => {
                                return (
                                  <HeroProduct key={i} product={product} />
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <Link
                                to="/products"
                                className="inline text-[14px] font-semibold text-primary_clr border border-primary_clr py-3 px-8 transition-all hover:bg-primary_clr hover:text-[#fff]"
                              >
                                More Product
                                <i className="icon-arrow-right ml-2"></i>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/trend/3"
                  element={
                    <>
                      {products.length <= 0 && (
                        <>
                          <h1>No Products SoFar</h1>
                        </>
                      )}
                      <div>
                        {products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-[30px]  p-3">
                              {products.slice(0, 6).map((product, i) => {
                                return (
                                  <HeroProduct key={i} product={product} />
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <Link
                                to="/products"
                                className="inline text-[14px] font-semibold text-primary_clr border border-primary_clr py-3 px-8 transition-all hover:bg-primary_clr hover:text-[#fff]"
                              >
                                More Product
                                <i className="icon-arrow-right ml-2"></i>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/trend/4"
                  element={
                    <>
                      {products.length <= 0 && (
                        <>
                          <h1>No Products SoFar</h1>
                        </>
                      )}
                      <div>
                        {products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-[30px]  p-3">
                              {products.slice(0, 6).map((product, i) => {
                                return (
                                  <HeroProduct key={i} product={product} />
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <Link
                                to="/products"
                                className="inline text-[14px] font-semibold text-primary_clr border border-primary_clr py-3 px-8 transition-all hover:bg-primary_clr hover:text-[#fff]"
                              >
                                More Product
                                <i className="icon-arrow-right ml-2"></i>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
                <Route
                  path="/trend/5"
                  element={
                    <>
                      {products.length <= 0 && (
                        <>
                          <h1>No Products SoFar</h1>
                        </>
                      )}
                      <div>
                        {products.length > 0 && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-[30px]  p-3">
                              {products.slice(0, 6).map((product, i) => {
                                return (
                                  <HeroProduct key={i} product={product} />
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <Link
                                to="/products"
                                className="inline text-[14px] font-semibold text-primary_clr border border-primary_clr py-3 px-8 transition-all hover:bg-primary_clr hover:text-[#fff]"
                              >
                                More Product
                                <i className="icon-arrow-right ml-2"></i>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
              </Routes>
            </div>
          </div>

          <div className="heroAppDownload px-5 md:px-[50px] lg:px-[100px] py-[60px] md:py-[96px]">
            <div
              className={`heroAppDownloadBanner h-[350px] bg-cover bg-no-repeat bg-primary_clr bg-blend-multiply flex items-center rounded-2xl`}
              style={{ backgroundImage: `url("${Iphone12}")` }}
            >
              <div className="ml-[15px] sm:ml-[50px] md:ml-[70px] lg:ml-[100px]">
                <h2 className="text-white mb-5">
                  Download Norda <br />
                  App Now!
                </h2>
                <p className="text-white mb-5">Shopping faster with our app.</p>
                <div className="flex">
                  <a href="/" className="block">
                    <img
                      className="w-full md:w-[110px] mr-[10px] md:mr-[20px]"
                      src={Playstore}
                      alt=""
                    />
                  </a>
                  <a href="/" className="block">
                    <img
                      className="w-full md:w-[110px] mr-[10px] md:mr-[20px]"
                      src={Appstore}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
