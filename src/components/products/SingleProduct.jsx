import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCartAction } from "../../redux/slices/CartSlice";
import { addProductToWishListAction } from "../../redux/slices/WishlistSlice";

const SingleProduct = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const {
    _id,
    title,
    price,
    oldPrice,
    rating,
    discount,
    image,
    countInStock,
    numReviews,
  } = product;
  return (
    <div className="product overflow-hidden relative  border border-[#f1f1f1] my-2 sm:my-5 p-3 sm:p-4 shadow-lg rounded-lg">
      <div className="overflow-hidden relative">
        <Link
          to={`/products/${_id}`}
          className="flex items-center justify-center overflow-hidden w-auto h-[250px] relative pb-2"
        >
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${image.filename}`}
            alt=""
            className="transition-all duration-300 w-auto max-h-full"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-0 font-semibold text-white inline-block pt-1 px-[6px] pb-[5px] leading-[1] left-0 bg-primary_clr rounded text-[12px]">
            -{discount}%
          </span>
        )}

        {wishlistItems.find((item) => item._id === _id) ? (
          <></>
        ) : (
          <div className="absolute right-1 top-1  tooltip-style-2">
            <button
              className="wishlist_btn flex items-center justify-center w-10 h-10 text-[14px] text-black hover:text-white rounded-[50%] border-2 border-[#ebebeb] bg-white hover:bg-black"
              onClick={() =>
                dispatch(
                  addProductToWishListAction({
                    _id,
                    title,
                    price,
                    image: image.filename,
                    countInStock,
                  })
                )
              }
            >
              <i className="icon-heart"></i>
            </button>
          </div>
        )}
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center">
          <Rating precision={0.1} readOnly value={rating} size="small" />
          <span className="text-[#999] mr-[6px]">({numReviews})</span>
        </div>
        <h3 className="text-[14px] font-bold mt-[2px] mx-0 mb-[8px] overflow-hidden max-h-[40px]">
          <Link
            to={`/products/${_id}`}
            className="transition-all text-black hover:text-primary_clr"
          >
            {title}
          </Link>
        </h3>
        <div className="product-price-2">
          <span className="text-primary_clr inline-block mx-1 my-0 text-[18px]">
            ${price}
          </span>
          {oldPrice > 0 && (
            <span className="text-[#999] line-through inline-block mx-1 my-0 text-[16px]">
              ${oldPrice}
            </span>
          )}
        </div>
      </div>
      <div className="product_content_transit text-center absolute left-0 right-0  pt-[17px] px-[10px] pb-[5px]">
        <div className="flex items-center justify-center">
          <Rating precision={0.1} readOnly value={rating} size="small" />
          <span className="text-[#999] mr-[6px]">({numReviews})</span>
        </div>
        <h3 className="text-[14px] font-bold mt-[2px] mx-0 mb-[8px] overflow-hidden max-h-[40px]">
          <Link
            to={`/products/${_id}`}
            className="transition-all text-black hover:text-primary_clr"
          >
            {title}
          </Link>
        </h3>
        <div className="product-price-2">
          <span className="text-primary_clr inline-block mx-1 my-0 text-[18px]">
            ${price}
          </span>
          {oldPrice > 0 && (
            <span className="text-[#999] line-through inline-block mx-1 my-0 text-[16px]">
              ${oldPrice}
            </span>
          )}
        </div>
        <div className="my-2">
          {cartItems.find((item) => item._id === _id) ? (
            <Link to={"/cart"}>
              <button className="transition-all border-none font-bold text-[14px] bg-black hover:bg-primary_clr text-white py-2 px-7 rounded-lg">
                View Cart
              </button>
            </Link>
          ) : (
            <button
              className="transition-all border-none font-bold text-[14px] bg-black hover:bg-primary_clr text-white py-2 px-7 rounded-lg"
              onClick={() =>
                dispatch(
                  addProductToCartAction({
                    _id,
                    title,
                    price,
                    image: image.filename,
                    countInStock,
                  })
                )
              }
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <style>{`
      .product div a img {
        transform: scale(1);
        transition: 0.3s all ease-in-out;
      }
      .product:hover div a img {
        transform: scale(0.96);
      }
      .product .product_content_transit {
        background:white;
        transition: 0.3s ease-in-out all;
        opacity: 0;
        visibility: hidden;
        bottom: -30px;
      }
      .product:hover .product_content_transit {
        opacity: 1;
        visibility: visible;
        bottom: 0;
      }
      .product .wishlist_btn {
        transition: 0.3s ease-in-out all;
        opacity:0;
      }
      .product:hover .wishlist_btn {
        opacity:1;
      }
      `}</style>
    </div>
  );
};

export default SingleProduct;
