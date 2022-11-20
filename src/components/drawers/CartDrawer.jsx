import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeProductFromCartAction } from "../../redux/slices/CartSlice";

const CartDrawer = ({ setOpenCartDrawer }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="sidebar-cart-all relative pt-[64px] md:pt-[104px] px-[15px] md:px-[30px] max-w-[95%] w-[300px] md:w-[400px]">
      <div
        className="absolute top-[27px] md:top-[37px] right-[17px] md:right-[50px] text-[23px]  text-[#6d6d6d] border-none hover:text-primary_clr"
        onClick={() => setOpenCartDrawer(false)}
      >
        <i className="icon-close"></i>
      </div>
      <div className="cart-content">
        <h3 className="text-[18px] font-semibold mb-[35px]">Shopping Cart</h3>
        {cartItems.length <= 0 && <h1>No Cart Items Sofar</h1>}
        {cartItems.length > 0 && (
          <div>
            <ul className="cartItemsList mr-[-30px] pr-[30px] mb-[15px] md:mb-[35px]">
              {cartItems.map((product, i) => {
                return (
                  <li key={i} className="flex mb-[30px]">
                    <div className="cartImg">
                      <Link
                        to={`/products/${product._id}`}
                        onClick={() => setOpenCartDrawer(false)}
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${product.image}`}
                          className="w-full border border-[#0000001a]"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="ml-[20px]">
                      <h4 className="text-[15px] mb-[8px] font-medium">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-[#000] hover:text-primary_clr"
                          onClick={() => setOpenCartDrawer(false)}
                        >
                          {product.title}
                        </Link>
                      </h4>
                      <span>
                        {" "}
                        {product.qty} × ${product.price}{" "}
                      </span>
                    </div>
                    <div className="flex grow-[100] justify-end">
                      <span
                        className="block text-[16px] h-[20px] overflow-hidden w-[20px] text-right text-[#000] hover:text-primary_clr cursor-pointer bg-white z-10"
                        onClick={() =>
                          dispatch(removeProductFromCartAction(product._id))
                        }
                      >
                        ×
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
              <h4 className="text-[16px] m-0 text-[#000] font-semibold flex justify-between">
                <span>Subtotal:</span>
                <span className="text-primary_clr">
                  $
                  {cartItems
                    .filter((product) => product.countInStock > 0)
                    .reduce(
                      (sum, product) => sum + product.price * product.qty,
                      0
                    )
                    .toFixed(2)}
                </span>
              </h4>
            </div>
            <div>
              <Link
                className="w-full block mt-[10px] text-center pt-[18px] px-[20px] pb-[17px] bg-black text-white capitalize text-[16px] leading-[1] hover:bg-primary_clr transition-all"
                to="/cart"
                onClick={() => setOpenCartDrawer(false)}
              >
                view cart
              </Link>
              <Link
                className="w-full block mt-[10px] text-center pt-[18px] px-[20px] pb-[17px] bg-black text-white capitalize text-[16px] leading-[1]  hover:bg-primary_clr transition-all"
                to="/checkout"
                onClick={() => setOpenCartDrawer(false)}
              >
                checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <style>{`
      .cartItemsList {
        overflow-y: scroll;
        max-height: 300px;
        max-height: calc(100vh - 400px);
      }

      @media only screen and (max-width: 767px) {
        .cartItemsList {
          max-height: calc(100vh - 300px);
        }
      }

      .cartImg {
        flex: 0 0 70px;
      }
      `}</style>
    </div>
  );
};

export default CartDrawer;
