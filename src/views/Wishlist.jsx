import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumbNav } from "../components";
import { addProductToCartAction } from "../redux/slices/CartSlice";
import { removeProductFromWishlistAction } from "../redux/slices/WishlistSlice";

function SingleCartItem({ product }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [qtyValue, setQtyValue] = useState(product.qty);

  let incrementToCartQty = (countInStock) => {
    if (qtyValue === countInStock) {
      setQtyValue(countInStock);
    } else {
      setQtyValue(qtyValue + 1);
    }
  };
  let decrementToCartQty = () => {
    if (qtyValue === 1) {
      setQtyValue(1);
    } else {
      setQtyValue(qtyValue - 1);
    }
  };

  return (
    <tr>
      <td className="product-thumbnail ">
        <Link
          to={`/products/${product._id}`}
          className="w-[100px] h-[100px] flex items-center justify-center mx-auto px-2"
        >
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${product.image}`}
            alt=""
            className="max-h-full max-w-full"
          />
        </Link>
      </td>
      <td className="product-name">
        <Link
          to={`/products/${product._id}`}
          className="hover:text-primary_clr text-[15px]"
        >
          {product.title}
        </Link>
      </td>
      <td className="product-price-cart">
        <span className="amount">${product.price}</span>
      </td>
      <td className="product-quantity pro-details-quality">
        {product.countInStock <= 0 && <p>Out Of Stock</p>}
        {product.countInStock > 0 && (
          <div className="w-full flex items-center justify-center">
            <div className="num-in border border-[rgba(0,0,0,0.15)] rounded-[4px] h-[34px] flex w-[98px]">
              <span
                className="w-[33.33%] block h-full relative cursor-pointer before:content-[''] before:absolute before:bg-black before:h-[2px] before:w-[10px] before:top-1/2 before:left-1/2 before:mt-[-1px] before:ml-[-5px] hover:before:bg-primary_clr hover:after:bg-primary_clr"
                onClick={() => decrementToCartQty()}
              ></span>
              <input
                type="text"
                className="w-[33.33%] h-auto border-none text-[14px] font-semibold text-center text-black"
                value={qtyValue}
                readOnly
              />
              <span
                className="w-[33.33%] block h-full relative cursor-pointer before:content-[''] before:absolute before:bg-black before:h-[2px] before:w-[10px] before:top-1/2 before:left-1/2 before:mt-[-1px] before:ml-[-5px] 
              after:content-[''] after:absolute after:bg-black after:h-[2px] after:w-[10px] after:top-1/2 after:left-1/2 after:mt-[-1px] after:ml-[-5px] hover:before:bg-primary_clr hover:after:bg-primary_clr after:rotate-90"
                onClick={() => incrementToCartQty(product.countInStock)}
              ></span>
            </div>
          </div>
        )}
      </td>
      <td className="product-subtotal">
        ${(product.price * qtyValue).toFixed(2)}
      </td>
      <td className="product-wishlist-cart">
        {cartItems.find((item) => item._id === product._id) ? (
          <Link to={"/cart"}>
            <span className="text-white bg-black hover:bg-primary_clr cursor-pointer text-[12px] font-semibold leading-[1] py-[10px] px-3 inline-block capitalize transition-all">
              View Cart
            </span>
          </Link>
        ) : (
          <span
            className="text-white bg-black hover:bg-primary_clr cursor-pointer text-[12px] font-semibold leading-[1] py-[10px] px-3 inline-block capitalize transition-all"
            onClick={() => {
              dispatch(
                addProductToCartAction({
                  _id: product._id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                  countInStock: product.countInStock,
                  qty: qtyValue,
                })
              );
              setQtyValue(product.qty);
              dispatch(removeProductFromWishlistAction(product._id));
            }}
          >
            add to cart
          </span>
        )}
      </td>
    </tr>
  );
}

const WishList = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  return (
    <>
      <BreadCrumbNav location={"Wishlist"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <h3 className="cart-page-title">Your WishList items</h3>
        {wishlistItems.length <= 0 && (
          <h1>There are no Items in your wishlist sofar</h1>
        )}
        {wishlistItems.length > 0 && (
          <div>
            <div>
              <div className="table-content table-responsive cart-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Until Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((product, i) => {
                      return <SingleCartItem key={i} product={product} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <style>{`
        h3.cart-page-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 15px;
        }
        
        .cart-table-content table {
          border: 1px solid #ebebeb;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table {
            width: 100%;
          }
        }
        
        .cart-table-content table thead > tr {
          background-color: #f9f9f9;
          border: 1px solid #ebebeb;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table thead > tr {
            width: 100%;
            display: block;
            padding: 10px 0;
          }
        }
        
        @media only screen and (min-width: 576px) and (max-width: 767px) {
          .cart-table-content table thead > tr {
            width: inherit;
            display: inline-block;
            padding: 10px 0;
          }
        }
        
        .cart-table-content table thead > tr th {
          border-top: medium none;
          font-size: 16px;
          font-weight: 600;
          padding: 21px 45px 22px;
          text-align: center;
          text-transform: capitalize;
          vertical-align: middle;
          white-space: nowrap;
        }
        
        @media only screen and (min-width: 992px) and (max-width: 1199px) {
          .cart-table-content table thead > tr th {
            padding: 21px 35px 22px;
          }
        }
        
        @media only screen and (min-width: 768px) and (max-width: 991px) {
          .cart-table-content table thead > tr th {
            padding: 21px 15px 22px;
          }
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table thead > tr th {
            padding: 0px 20px 5px;
            width: 100%;
            display: block;
          }
        }
        
        @media only screen and (min-width: 576px) and (max-width: 767px) {
          .cart-table-content table thead > tr th {
            width: inherit;
            display: inline-block;
          }
        }
        
        .cart-table-content table tbody > tr {
          border-bottom: 1px solid #ebebeb;
        }
        
        @media only screen and (min-width: 576px) and (max-width: 767px) {
          .cart-table-content table tbody > tr {
            width: 50%;
            float: left;
          }
        }
        
        .cart-table-content table tbody > tr td.product-thumbnail {
          width: 150px;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-thumbnail {
            width: 100%;
            display: block;
            overflow: hidden;
            padding-top: 30px;
            padding-bottom: 5px;
          }
        }
        
        .cart-table-content table tbody > tr td.product-name {
          width: 435px;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-name {
            width: 100%;
            display: block;
            overflow: hidden;
          }
        }
        .cart-table-content table tbody > tr td.product-quantity {
          width: 435px;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-quantity {
            width: 100%;
            display: block;
            overflow: hidden;
          }
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-wishlist-cart {
            padding-bottom: 30px;
          }
        }

        .cart-table-content table tbody > tr td {
          font-size: 15px;
          padding: 30px 0;
          text-align: center;
          font-weight: 500;
        }
        
        @media only screen and (min-width: 768px) and (max-width: 991px) {
          .cart-table-content table tbody > tr td {
            padding: 30px 0 30px 10px;
          }
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td {
            padding: 6px 0 6px 0px;
            width: 100%;
            display: block;
            overflow: hidden;
          }
        }
        
        @media only screen and (min-width: 576px) and (max-width: 767px) {
          .cart-table-content table tbody > tr td {
            text-align: left;
            padding: 6px 20px 6px 20px;
          }
        }
        `}</style>
      </div>
    </>
  );
};

export default WishList;
