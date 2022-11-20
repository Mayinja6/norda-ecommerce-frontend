import { useState, useEffect } from "react";
import { Avatar, Rating } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Navigation, Thumbs } from "swiper";
import { useToasts } from "react-toast-notifications";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

import {
  fetchAProductByIdAction,
  productsStateReset,
  reviewAProductByIdAction,
} from "../redux/slices/ProductsSlice";
import { addProductToCartAction } from "../redux/slices/CartSlice";
import {
  BreadCrumbNav,
  SingleProduct,
  LoaderAnim,
  DeleteProductConfirmationDialogue,
} from "../components";
import { addProductToWishListAction } from "../redux/slices/WishlistSlice";

function ReviewComponent({ productDetails }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.auth);
  const { newCreated } = useSelector((state) => state.products);
  const [productReviewData, setProductReviewData] = useState({
    rating: null,
    comment: "",
  });

  useEffect(() => {
    dispatch(productsStateReset());
    if (newCreated) {
      addToast("Thanks for your feedback!", {
        appearance: "info",
        autoDismiss: true,
      });
    }
  }, [dispatch, addToast, newCreated]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (productReviewData.rating === null) {
      addToast("Rate your Review.", { appearance: "info", autoDismiss: true });
      return;
    }
    if (productReviewData.comment === "") {
      addToast("Choose a message for your review", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    dispatch(
      reviewAProductByIdAction({
        productId: productDetails._id,
        body: productReviewData,
      })
    );
  };

  return (
    <div className="reviewTab">
      <div className="review-wrapper">
        <h2 className="text-[18px] md:text-[20px] lg:text-[22px] mb-[18px] md:mb-[25px]">
          {productDetails.numReviews}{" "}
          {productDetails.numReviews === 1 ? "Review" : "Reviews"} for{" "}
          {productDetails.title}
        </h2>
        <div>
          {productDetails.reviews.length > 0 && (
            <div
              className={`user_reviews mb-[40px] p-5 h-auto max-h-[650px] ${
                productDetails !== null && productDetails.numReviews >= 3
                  ? "overflow-y-scroll"
                  : ""
              }`}
            >
              {productDetails.reviews.map((review, i) => {
                return (
                  <div
                    key={i}
                    className="mb-[20px] md:mb-[40px] p-[20px] md:py-[40px] md:px-[20px] border border-[#000000] block md:flex"
                  >
                    <div className="w-[75px] h-[75px] flex items-center justify-center">
                      <Avatar />
                    </div>
                    <div className="review-content md:ml-[20px] w-full">
                      <div className="block md:flex items-center justify-between my-[10px] mx-0 md:mt-0 md:mx-0 md:mb-[15px]">
                        <div className="review-name">
                          <h5 className="text-[13px] m-0 text-[#333]">
                            <span className="font-semibold text-[14px] text-black">
                              {review.name}
                            </span>{" "}
                            -{" "}
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-us",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </h5>
                        </div>
                        <div className="review-rating leading-[1] mt-[10px] md:mt-0">
                          <Rating
                            readOnly
                            value={review.rating}
                            size="small"
                            precision={0.1}
                          />
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {!user && (
        <div className="flex items-center justify-center">
          <Link to={`/auth/signin`}>
            <button className="inline-block text-[16px] text-white font-medium leading-[1] bg-black hover:bg-primary_clr transition-all pt-[18px] px-[15px] pb-[17px] sm:px-[30px] md:px-[50px]">
              Login To Review
            </button>
          </Link>
        </div>
      )}
      {user &&
        productDetails.reviews.filter((review) => review.name === user.fullname)
          .length <= 0 && (
          <div className="ratting-form-wrapper">
            <span className="block text-base">Add a Review</span>
            <form
              className=" flex flex-wrap mt-[16px] mx-0 mb-[29px] w-full"
              onSubmit={handleReviewSubmit}
            >
              <div className="rating-form-style mb-5 md:mb-10 w-full md:w-1/2">
                <label className="mb-[5px] block">
                  Rating
                  <span className="text-primary_clr text-[17px]">*</span>
                </label>
                <select
                  className="border border-[#cdcdcd] p-3 focus:border-[#262626]"
                  onChange={(e) =>
                    setProductReviewData({
                      ...productReviewData,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rate, i) => {
                    return (
                      <option
                        key={i}
                        className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                        value={rate}
                      >
                        {rate}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="rating-form-style mb-5  w-full">
                <label className="mb-[5px] block">
                  Your Review Message
                  <span className="text-primary_clr text-[17px]">*</span>
                </label>
                <textarea
                  className="bg-transparent border border-[#cdcdcd] h-[150px] w-full py-1 px-2 focus:border-[#262626]"
                  onChange={(e) =>
                    setProductReviewData({
                      ...productReviewData,
                      comment: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="mt-[20px] w-full">
                <button
                  type="submit"
                  className="py-2 px-[35px] leading-[30px] font-semibold text-white inline-block w-auto h-auto uppercase bg-black hover:bg-primary_clr"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
}

const ProductDetails = () => {
  const [deleteProduct, setDeleteProduct] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { products, productsPending, productDetails } = useSelector(
    (state) => state.products
  );
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [socialIconsVisibility, setSocialIconsVisibility] = useState(false);

  useEffect(() => {
    dispatch(fetchAProductByIdAction(productId));
  }, [dispatch, addToast, productId]);

  return (
    <>
      <BreadCrumbNav location={"Product Details"} />
      {productsPending && (
        <>
          <LoaderAnim />
        </>
      )}
      {productDetails !== null ? (
        <section className="p-5 md:py-10 md:px-[50px] lg:px-[100px]">
          <div className="productDetails flex flex-col md:flex-row">
            <div className="productDetails_image h-[280px] md:h-[420px] w-full md:w-1/2 flex items-center justify-center md:mr-10">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${productDetails.image.filename}`}
                alt="Product_Img"
                className="max-w-full max-h-full w-auto h-auto"
              />
            </div>
            <div className="productDetails_content w-full md:w-1/2 product-details-content mt-[25px] sm:mt-[30px] pro-details-content-mrg">
              <h2 className="text-[22px] md:text-[25px] font-bold m-0 font-[poppins]">
                {productDetails.title}
              </h2>
              <div className="flex items-center  flex-col md:flex-row mt-[16px] mx-0 mb-[10px]">
                <div className="flex items-center flex-wrap relative mr-[35px] before:absolute before:-translate-y-1/2 before:top-[50%] before:right-[-18px] before:bg-[#bcbcbc] before:w-[1px] before:h-[20px]">
                  <Rating
                    readOnly
                    value={productDetails.rating}
                    precision={0.1}
                  />
                  <div className="md:ml-[15px]">
                    <span className="text-[16px] text-[#484848]">
                      {productDetails.rating}
                    </span>
                  </div>
                </div>
                <div className="text-[16px] text-[#484848] mt-3 md:mt-0">
                  <span className="text-[15px] mr-[10px]">
                    {productDetails.numReviews}{" "}
                    {productDetails.numReviews === 1 ? "Review" : "Reviews"}
                  </span>
                </div>
              </div>
              <p className="text-[15px] leading-6 m-0">
                {productDetails.description}
              </p>
              <div className="flex items-center my-4 mx-0">
                <span className="text-[28px] font-medium text-primary_clr">
                  ${productDetails.price}
                </span>
                {productDetails.oldPrice > 0 && (
                  <span className="text-[20px] font-medium line-through ml-[15px] text-[#666]">
                    $95.72
                  </span>
                )}
              </div>
              <div className="mt-[11px] mx-0 mb-[19px] md:my-5">
                <ul>
                  <li>
                    <span className="inline-block font-semibold w-[105px] ">
                      Category:
                    </span>
                    <Link
                      className="text-[#1c1c1c] hover:text-primary_clr"
                      to="/products"
                    >
                      {productDetails.category}
                    </Link>
                  </li>
                  <li>
                    <span className="inline-block font-semibold w-[105px] ">
                      Brand:
                    </span>
                    <Link
                      className="text-[#1c1c1c] hover:text-primary_clr"
                      to="/products"
                    >
                      {productDetails.brand}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex items-center flex-wrap">
                {cartItems.find((item) => item._id === productDetails._id) ? (
                  <Link to={"/cart"}>
                    <button className="mr-[20px] inline-block text-[16px] text-white font-medium leading-[1] bg-black hover:bg-primary_clr transition-all pt-[18px] px-[30px] pb-[17px] sm:px-[50px]">
                      View In Cart
                    </button>
                  </Link>
                ) : (
                  <button
                    className="mr-[20px] inline-block text-[16px] text-white font-medium leading-[1] bg-black hover:bg-primary_clr transition-all pt-[18px] px-[30px] pb-[17px] sm:px-[50px]"
                    onClick={() =>
                      dispatch(
                        addProductToCartAction({
                          _id: productDetails._id,
                          title: productDetails.title,
                          price: productDetails.price,
                          image: productDetails.image.filename,
                          countInStock: productDetails.countInStock,
                        })
                      )
                    }
                  >
                    Add To Cart
                  </button>
                )}

                <div className="relative">
                  {wishlistItems.find(
                    (item) => item._id === productDetails._id
                  ) ? (
                    <span className="transition-all inline-block text-[17px] leading-[1] py-[16px] px-[18px] text-white bg-primary_clr border border-[#ededed] mr-[15px] relative cursor-not-allowed">
                      <i className="icon-heart"></i>
                    </span>
                  ) : (
                    <span
                      className="transition-all inline-block text-[17px] leading-[1] py-[16px] px-[18px] text-black hover:text-white hover:bg-primary_clr cursor-pointer border border-[#ededed] mr-[15px] relative"
                      onClick={() =>
                        dispatch(
                          addProductToWishListAction({
                            _id: productDetails._id,
                            title: productDetails.title,
                            price: productDetails.price,
                            image: productDetails.image.filename,
                            countInStock: productDetails.countInStock,
                          })
                        )
                      }
                    >
                      <i className="icon-heart"></i>
                    </span>
                  )}

                  <span
                    className="transition-all inline-block text-[17px] leading-[1] py-[16px] px-[18px] text-black hover:text-white hover:bg-primary_clr cursor-pointer border border-[#ededed] relative"
                    onClick={() =>
                      setSocialIconsVisibility(!socialIconsVisibility)
                    }
                  >
                    <i className="icon-share"></i>
                  </span>
                  <div
                    className={`product_social absolute bottom-[-33px] left-0 md:left-auto right-auto md:right-[-7px] flex ${
                      !socialIconsVisibility && "opacity-0 invisible"
                    }  transition-all`}
                  >
                    <a
                      className="bg-[#5678bf] flex items-center justify-center w-[30px] h-[30px] text-white text-center text-[12px]"
                      href="/"
                    >
                      <i className="icon-social-facebook"></i>
                    </a>
                    <a
                      className="bg-[#73c2fd] flex items-center justify-center w-[30px] h-[30px] text-white text-center text-[12px]"
                      href="/"
                    >
                      <i className="icon-social-twitter"></i>
                    </a>
                    <a
                      className="bg-[#e4405f] flex items-center justify-center w-[30px] h-[30px] text-white text-center text-[12px]"
                      href="/"
                    >
                      <i className="icon-social-instagram"></i>
                    </a>
                    <a
                      className="bg-[#c32026] flex items-center justify-center w-[30px] h-[30px] text-white text-center text-[12px]"
                      href="/"
                    >
                      <i className="icon-social-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>
              {user && productDetails.createdBy === user.id && (
                <div className="flex mt-10">
                  <>
                    <button
                      className="mr-[20px] inline-block text-[16px] text-white font-medium leading-[1] bg-black hover:bg-primary_clr transition-all pt-[18px] px-[15px] pb-[17px] sm:px-[30px] md:px-[50px]"
                      onClick={() => setDeleteProduct(true)}
                    >
                      Delete Product
                    </button>
                    <DeleteProductConfirmationDialogue
                      productId={productId}
                      deleteProduct={deleteProduct}
                      setDeleteProduct={setDeleteProduct}
                    />
                  </>
                  <Link to={`/products/update/${productId}`}>
                    <button className="inline-block text-[16px] text-white font-medium leading-[1] bg-black hover:bg-primary_clr transition-all pt-[18px] px-[15px] pb-[17px] sm:px-[30px] md:px-[50px]">
                      Update Product
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="productDetails_descriptionAndReviews py-[110px]">
            <div className="border-b border-[#ebebeb] flex justify-center flex-wrap mb-10">
              {[
                { name: "Description", link: `/products/${productId}` },
                {
                  name: "Reviews and Rating",
                  link: `/products/${productId}/reviews`,
                },
                { name: "Specification", link: `/products/${productId}/specs` },
                { name: "Meterials", link: `/products/${productId}/mats` },
              ].map((navlink, i) => {
                return (
                  <Link
                    key={i}
                    className={`transition-all active inline-block text-[15px] md:text-[18px] text-black pt-0 px-[7px] sm:px-[10px] md:px-[30px] pb-[13px] md:pb-[22px] relative mt-0 mr-[10x] md:mr-[14px] mb-2  before:absolute before:content-[''] before:left-0 before:bottom-0 before:h-[2px] before:w-full hover:text-primary_clr before:bg-primary_clr before:z-[2] ${
                      pathname !== navlink.link
                        ? "before:opacity-0 before:invisible"
                        : "before:opacity-1 before:visible text-primary_clr font-semibold"
                    }`}
                    to={navlink.link}
                  >
                    {navlink.name}
                  </Link>
                );
              })}
            </div>
            <div className="productDetails_tabs">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="description-wrap">
                      <p className="text-[14px] mb-[15px] md:mb-[25px] leading-[27px]">
                        {productDetails.description}
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/reviews"
                  element={<ReviewComponent productDetails={productDetails} />}
                />
                <Route
                  path="/specs"
                  element={
                    <div className="specification-wrap table-responsive">
                      <table className="w-full">
                        <tbody className="border border-[#f0f0f0] w-full">
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Name
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Salwar Kameez
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              SKU
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              0x48e2c
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Models
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              FX 829 v1
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Categories
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Digital Print
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Size
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              60’’ x 40’’
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Brand
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Individual Collections
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Color
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Black, White
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  }
                />
                <Route
                  path="/mats"
                  element={
                    <div className="specification-wrap table-responsive">
                      <table className="w-full">
                        <tbody className="border border-[#f0f0f0] w-full">
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Top
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Cotton Digital Print Chain Stitch Embroidery Work
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Bottom
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Cotton Cambric
                            </td>
                          </tr>
                          <tr className=" border-b border-[#f0f0f0]">
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px] font-medium lg:w-[300px]">
                              Dupatta
                            </td>
                            <td className="border-r border-[#f0f0f0] text-[15px] text-black py-[17px] px-[15px] md:px-[20px] lg:px-[30px]">
                              Digital Printed Cotton Malmal With Chain Stitch
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
          <div className="productDetails_relatedProducts pb-[115px]">
            <div className="mb-[25px] lg:mb-[30px] text-center">
              <h2 className="text-6 font-black uppercase m-0 ">
                Related Product
              </h2>
            </div>
            <div>
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  746: { slidesPerView: 3, spaceBetween: 30 },
                  1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
                autoplay={{ delay: 3000 }}
                loop={true}
                navigation={true}
                speed={500}
              >
                {products.map((product, i) => {
                  return (
                    <SwiperSlide key={i} onClick={() => window.scrollTo(0, 0)}>
                      <SingleProduct product={product} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </section>
      ) : (
        <h1>No Product So Far!</h1>
      )}
    </>
  );
};

export default ProductDetails;
