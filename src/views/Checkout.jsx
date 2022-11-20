import { useEffect, useState } from "react";
import { Breadcrumbs } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  Link,
  useNavigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  saveShippingAddressAction,
  savePaymentMethodAction,
  orderSuccessfullyPlacedAction,
} from "../redux/slices/CartSlice";
import {
  createAnOrderAction,
  orderStateReset,
} from "../redux/slices/OrderSlice";
import { BreadCrumbNav, LoaderAnim } from "../components";

function ShippingAddressInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [shippingAddressForm, setShippingAddressForm] = useState({
    address: "",
    city: "",
    zipCode: "",
  });

  return (
    <div className="account_tab w-full sm:w-3/4 mx-auto">
      {shippingAddress.address !== "" && (
        <div className="mb-16">
          <p className="account_heading">Available Shipping Adderss</p>
          <p className="mb-[15px]">
            Address:{" "}
            {shippingAddress.address !== "" ? (
              <b className="ml-2">{shippingAddress.address}</b>
            ) : (
              "Not Set"
            )}
          </p>
          <p className="mb-[15px]">
            City:{" "}
            {shippingAddress.city !== "" ? (
              <b className="ml-2">{shippingAddress.city}</b>
            ) : (
              "Not Set"
            )}
          </p>
          <p className="mb-[15px]">
            Zipcode:{" "}
            {shippingAddress.zipCode !== "" ? (
              <b className="ml-2">{shippingAddress.zipCode}</b>
            ) : (
              "Not Set"
            )}
          </p>
          <button
            className="bg-primary_clr uppercase font-semibold py-[9px] px-[25px] text-white text-[13px] hover:bg-[#1f2226] transition-all"
            onClick={() => {
              dispatch(
                saveShippingAddressAction({
                  address: shippingAddress.address,
                  city: shippingAddress.city,
                  zipCode: shippingAddress.zipCode,
                })
              );
              navigate("/checkout/payment");
            }}
          >
            Continue
          </button>
        </div>
      )}

      <div className="account_tab_edit">
        <h3 className="account_heading">Edit Shipping Address</h3>
        <p className="my-5 text-center">
          <b>Only shipping to Ugandan Addresses at the moment!</b>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (shippingAddressForm.address === "") {
              addToast("Your Shipping Address is required!", {
                appearance: "info",
                autoDismiss: true,
              });
              return;
            }
            if (shippingAddressForm.city === "") {
              addToast("Your Shipping City is required!", {
                appearance: "info",
                autoDismiss: true,
              });
              return;
            }
            if (shippingAddressForm.zipCode === "") {
              addToast("Your Shipping Zipcode is required!", {
                appearance: "info",
                autoDismiss: true,
              });
              return;
            }
            dispatch(saveShippingAddressAction(shippingAddressForm));
            navigate("/checkout/payment");
          }}
        >
          <div className="mb-[20px] w-full">
            <label
              htmlFor="address"
              className="text-[14px] capitalize block mb-[5px]"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-[98%]"
              onChange={(e) =>
                setShippingAddressForm({
                  ...shippingAddressForm,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-[20px] w-full">
            <label
              htmlFor="city"
              className="text-[14px] capitalize block mb-[5px]"
            >
              City
            </label>
            <input
              type="text"
              placeholder="Enter City"
              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-[98%]"
              onChange={(e) =>
                setShippingAddressForm({
                  ...shippingAddressForm,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-[20px] w-full">
            <label
              htmlFor="zipCode"
              className="text-[14px] capitalize block mb-[5px]"
            >
              Zip / Postal Code
            </label>
            <input
              type="number"
              placeholder="Enter Zipcode"
              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-[98%]"
              onChange={(e) =>
                setShippingAddressForm({
                  ...shippingAddressForm,
                  zipCode: Number(e.target.value),
                })
              }
            />
          </div>
          <button
            type="submit"
            className="bg-primary_clr uppercase font-semibold py-[9px] px-[25px] text-white text-[13px] hover:bg-[#1f2226] transition-all"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}

function PaymentMethodInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const { paymentMethod: prefferedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  const [paymentMethod, setPaymentMethod] = useState(prefferedPaymentMethod);

  return (
    <div className="account_tab w-full sm:w-3/4 mx-auto">
      <p className="account_heading">Payment Method</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (paymentMethod === "") {
            addToast("Select your preffered payment method", {
              appearance: "info",
              autoDismiss: true,
            });
            return;
          }

          dispatch(savePaymentMethodAction(paymentMethod));
          navigate("/checkout/place-order");
        }}
      >
        <div className="flex items-center justify-center">
          <input
            type="radio"
            value="PayPal"
            checked={paymentMethod !== "" ? true : false}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal" className="ml-1">
            PayPal or Credit Card
          </label>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-primary_clr uppercase font-semibold py-[9px] px-[25px] text-white text-[13px] hover:bg-[#1f2226] transition-all"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

function PlaceOrderInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [transportFee] = useState(2.17);
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const { order, orderPending, orderSuccess, orderFailed, orderMessage } =
    useSelector((state) => state.order);

  useEffect(() => {
    if (shippingAddress.address === "") {
      navigate("/checkout");
      return;
    }
    if (paymentMethod === "") {
      navigate("/checkout/payment");
      return;
    }

    if (orderSuccess) {
      addToast("Order successfully created", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(orderSuccessfullyPlacedAction());
      navigate(`/account/orders/${order._id}`);
    }

    if (orderFailed) {
      addToast(orderMessage, { appearance: "error", autoDismiss: true });
    }

    dispatch(orderStateReset());
  }, [
    order,
    dispatch,
    addToast,
    navigate,
    paymentMethod,
    shippingAddress,
    orderSuccess,
    orderFailed,
    orderMessage,
  ]);

  return (
    <>
      <div className="account_tab">
        {orderPending ? (
          <>
            <LoaderAnim />
          </>
        ) : (
          <div className="block md:flex">
            <div className="w-full md:w-3/4 md:border-r md:mr-8 md:pr-2">
              <div className="mb-8">
                <p className="account_heading">Shipping Address</p>
                <p className="my-[15px]">
                  Address:
                  {shippingAddress.address !== "" ? (
                    <b className="ml-2">
                      {shippingAddress.address}, {shippingAddress.City}
                      {shippingAddress.zipCode}, Uganda
                    </b>
                  ) : (
                    "Not Set"
                  )}
                </p>
              </div>
              <div className="mb-8">
                <p className="account_heading">Payment Method</p>
                <p className="my-[15px]">
                  Payment Method:{" "}
                  {paymentMethod !== "" ? (
                    <b className="ml-2">{paymentMethod}</b>
                  ) : (
                    "Not Set"
                  )}
                </p>
              </div>
              <div className="mb-8">
                <p className="account_heading">Order Products</p>
                <div>
                  {cartItems.map((product, i) => {
                    return (
                      <div
                        key={i}
                        className="border-b border-dashed last:border-none pb-2 mb-2 last:mb-0 last:pb-0 flex items-center justify-between"
                      >
                        <p>{product.title}</p>{" "}
                        <div>
                          {product.qty} x ${product.price} = $
                          {product.qty * product.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 mt-16 md:mt-0">
              <p className="account_heading">ORDER SAMMARY</p>
              <div>
                <h4 className=" flex items-center justify-between font-medium mb-[25px]">
                  <span>Sub Total</span>{" "}
                  <span>
                    $
                    {cartItems
                      .filter((item) => item.countInStock > 0)
                      .reduce((sum, item) => sum + item.price * item.qty, 0)
                      .toFixed(2)}
                  </span>
                </h4>

                <h4 className=" flex items-center justify-between  font-medium mb-[25px]">
                  <span>Transport Fee</span> <span>${transportFee}</span>
                </h4>

                <h4 className="text-primary_clr flex items-center justify-between text-[20px] font-medium mb-[25px]">
                  <span>Grand Total</span>{" "}
                  <span>
                    $
                    {(
                      cartItems
                        .filter((item) => item.countInStock > 0)
                        .reduce((sum, item) => sum + item.price * item.qty, 0) +
                      transportFee
                    ).toFixed(2)}
                  </span>
                </h4>
                <button
                  className="bg-black block text-[14px] text-white font-semibold leading-[1] py-[18px] px-[10px] capitalize hover:bg-primary_clr hover:text-white w-full transition-all"
                  onClick={() =>
                    dispatch(
                      createAnOrderAction({
                        shippingAddress,
                        paymentMethod,
                        totalPrice: Number(
                          (
                            cartItems
                              .filter((item) => item.countInStock > 0)
                              .reduce(
                                (sum, item) => sum + item.price * item.qty,
                                0
                              ) + transportFee
                          ).toFixed(2)
                        ),
                        orderProducts: cartItems.map((item) => {
                          return {
                            title: item.title,
                            qty: item.qty,
                            price: item.price,
                            product: item._id,
                          };
                        }),
                      })
                    )
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Checkout = () => {
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <BreadCrumbNav location={"Checkout"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        {cartItems.length <= 0 ? (
          <>
            <h2>No Products to Checkout</h2>
            <div className="w-full md:w-auto flex justify-center mb-5 md:mb-0">
              <Link
                to="/products"
                className="bg-[#f2f2f2] inline-block text-[14px] font-semibold py-[18px] px-6 md:px-10 transition-all hover:bg-primary_clr hover:text-white "
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mb-10">
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/checkout">
                  <p
                    className={`${
                      pathname === `/checkout`
                        ? "text-primary_clr font font-bold"
                        : ""
                    }`}
                  >
                    Shipping
                  </p>
                </Link>
                <Link to="/checkout/payment">
                  <p
                    className={`${
                      pathname === `/checkout/payment`
                        ? "text-primary_clr font font-bold"
                        : ""
                    }`}
                  >
                    Payment
                  </p>
                </Link>
                <Link to="/checkout/place-order">
                  <p
                    className={`${
                      pathname === `/checkout/place-order`
                        ? "text-primary_clr font font-bold"
                        : ""
                    }`}
                  >
                    Place Order
                  </p>
                </Link>
              </Breadcrumbs>
            </div>
            <div>
              <Routes>
                <Route path="/" element={<ShippingAddressInfo />} />
                <Route path="/payment" element={<PaymentMethodInfo />} />
                <Route path="/place-order" element={<PlaceOrderInfo />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;
