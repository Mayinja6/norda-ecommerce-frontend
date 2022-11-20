import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BreadCrumbNav } from "../components";
import {
  removeProductFromCartAction,
  incrementCartProductQtyAction,
  decrementCartProductQtyAction,
  clearShoppingCartProductsAction,
} from "../redux/slices/CartSlice";

function SingleCartItem({ product }) {
  const dispatch = useDispatch();
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
          className="hover:text-primary_clr"
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
                onClick={() =>
                  dispatch(decrementCartProductQtyAction(product._id))
                }
              ></span>
              <input
                type="text"
                className="w-[33.33%] h-auto border-none text-[14px] font-semibold text-center text-black"
                value={product.qty}
                readOnly
              />
              <span
                className="w-[33.33%] block h-full relative cursor-pointer before:content-[''] before:absolute before:bg-black before:h-[2px] before:w-[10px] before:top-1/2 before:left-1/2 before:mt-[-1px] before:ml-[-5px] 
              after:content-[''] after:absolute after:bg-black after:h-[2px] after:w-[10px] after:top-1/2 after:left-1/2 after:mt-[-1px] after:ml-[-5px] hover:before:bg-primary_clr hover:after:bg-primary_clr after:rotate-90"
                onClick={() =>
                  dispatch(incrementCartProductQtyAction(product._id))
                }
              ></span>
            </div>
          </div>
        )}
      </td>
      <td className="product-subtotal">
        ${(product.price * product.qty).toFixed(2)}
      </td>
      <td className="product-remove">
        <span
          className="text-[20px] cursor-pointer hover:text-primary_clr"
          onClick={() => dispatch(removeProductFromCartAction(product._id))}
        >
          <i className="icon-close"></i>
        </span>
      </td>
    </tr>
  );
}

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <BreadCrumbNav location={"Cart"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <h3 className="cart-page-title">Your cart items</h3>
        {cartItems.length <= 0 && <h1>Your Cart is Empty</h1>}
        {cartItems.length > 0 && (
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
                    {cartItems.map((product, i) => {
                      return <SingleCartItem key={i} product={product} />;
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between flex-col md:flex-row pt-[30px] px-0 pb-[15px] md:pb-[55px]">
                <div className="cart-shiping-update w-full md:w-auto flex justify-center mb-5 md:mb-0">
                  <Link
                    to="/products"
                    className="bg-[#f2f2f2] inline-block text-[14px] font-semibold py-[18px] px-6 md:px-10 transition-all hover:bg-primary_clr hover:text-white "
                  >
                    Continue Shopping
                  </Link>
                </div>
                <div className="cart-clear w-full md:w-auto flex justify-center">
                  <span
                    className="bg-[#f2f2f2] inline-block text-[14px] font-semibold py-[18px] px-6 md:px-10 transition-all hover:bg-primary_clr hover:text-white cursor-pointer"
                    onClick={() => dispatch(clearShoppingCartProductsAction())}
                  >
                    Clear Cart
                  </span>
                </div>
              </div>
            </div>
            <div className="block md:flex md:justify-end">
              <div className="grand-totall md:ml-16 w-full md:w-[40%] bg-[#f9f9f9] border border-[#ebebeb] rounded-[5px] pt-[45px] px-[18px] md:px-[30px] pb-[50px]">
                <div className="relative before:bg-[#e3e1e1] before:content-[''] before:h-[1px] before:absolute before:left-0 before:top-[10px] before:w-full before:z-[1] before:transition-all">
                  <h4 className="cart-bottom-title section-bg-gary-cart text-[16px] md:text-[18px] inline-block font-semibold m-0 mr-[18px] bg-[#f8f9f9] relative z-[99] pr-4 mb-5">
                    Cart Total
                  </h4>
                </div>
                <h4 className="text-primary_clr flex items-center justify-between text-[20px] font-medium mb-[25px]">
                  <span>Total</span>{" "}
                  <span>
                    $
                    {cartItems
                      .filter((item) => item.countInStock > 0)
                      .reduce((sum, item) => sum + item.price * item.qty, 0)
                      .toFixed(2)}
                  </span>
                </h4>
                {!user ? (
                  <Link to={"/auth/signin"}>
                    <button className="bg-black block text-[14px] text-white font-semibold leading-[1] py-[18px] px-[10px] capitalize hover:bg-primary_clr hover:text-white w-full transition-all">
                      Signin to Checkout
                    </button>
                  </Link>
                ) : (
                  <Link to={"/checkout"}>
                    <button className="bg-black block text-[14px] text-white font-semibold leading-[1] py-[18px] px-[10px] capitalize hover:bg-primary_clr hover:text-white w-full transition-all">
                      Proceed to Checkout
                    </button>
                  </Link>
                )}
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
        
        .cart-table-content table tbody > tr td.product-name a {
          font-size: 15px;
        }
        
        .cart-table-content table tbody > tr td.product-price-cart {
          width: 435px;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-price-cart {
            width: 100%;
            display: block;
            overflow: hidden;
          }
        }
        
        .cart-table-content table tbody > tr td.product-price-cart span {
          font-weight: 500;
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
        
        .cart-table-content table tbody > tr td.product-remove {
          width: 100px;
        }
        
        @media only screen and (max-width: 767px) {
          .cart-table-content table tbody > tr td.product-remove {
            width: 100%;
            display: block;
            overflow: hidden;
            padding-bottom: 21px;
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

export default Cart;
