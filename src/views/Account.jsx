import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import {
  authStateReset,
  signOutAUserAction,
  updateAUserAction,
} from "../redux/slices/AuthSlice";

import { getAllUserOrders, orderStateReset } from "../redux/slices/OrderSlice";
import { orderSuccessfullyPlacedAction } from "../redux/slices/CartSlice";

import {
  BreadCrumbNav,
  DeleteUserConfirmationDialogue,
  LoaderAnim,
} from "../components";

function SingleOrderItem() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { ordersList, orderPending } = useSelector((state) => state.order);
  const selectedOrder = ordersList.filter((order) => order._id === orderId)[0];

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, [dispatch]);
  return (
    <div className="account_tab">
      {orderPending ? (
        <>
          <LoaderAnim />
        </>
      ) : (
        <>
          {selectedOrder === undefined ? (
            <p>Select An Order To View</p>
          ) : (
            <>
              <p className="account_heading uppercase text-[13px] md:text-[16px]">
                order {orderId}
              </p>
              <p className="mb-5">
                Date:{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "long",
                  weekday: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <div className="block md:flex">
                <div className="w-full md:w-3/4 md:border-r md:mr-8 md:pr-2">
                  <div className="mb-8">
                    <p className="account_heading">Shipping Address</p>
                    <p className="my-[15px]">
                      Name: {user ? <b>{user.fullname}</b> : "Not Set"}
                    </p>
                    <p className="my-[15px]">
                      Email Address: {user ? <b>{user.email}</b> : "Not Set"}
                    </p>
                    <p className="my-[15px]">
                      Address:
                      {selectedOrder.shippingAddress.address !== "" ? (
                        <b className="ml-2">
                          {selectedOrder.shippingAddress.address},{" "}
                          {selectedOrder.shippingAddress.City}
                          {selectedOrder.shippingAddress.zipCode}, Uganda
                        </b>
                      ) : (
                        "Not Set"
                      )}
                    </p>
                    <div
                      className={`${
                        selectedOrder.isDelivered
                          ? "bg-green-300"
                          : "bg-red-400"
                      } text-white p-3`}
                    >
                      {selectedOrder.isDelivered
                        ? "Delivered"
                        : "Not Delivered"}
                    </div>
                  </div>
                  <div className="mb-8">
                    <p className="account_heading">Payment Method</p>
                    <p className="my-[15px]">
                      Payment Method:{" "}
                      {selectedOrder.paymentMethod !== "" ? (
                        <b className="ml-2">{selectedOrder.paymentMethod}</b>
                      ) : (
                        "Not Set"
                      )}
                    </p>
                    <div
                      className={`${
                        selectedOrder.isPaid ? "bg-green-300" : "bg-red-400"
                      } text-white p-3`}
                    >
                      {selectedOrder.isPaid ? "Paid" : "Not Paid"}
                    </div>
                  </div>
                  <div className="mb-8">
                    <p className="account_heading">Order Products</p>
                    <div>
                      {selectedOrder.orderProducts.map((product, i) => {
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
                <div className="w-full md:w-1/4">
                  {!selectedOrder.isPaid && <>Pay With Paypal Client</>}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function UserOrdersRoute() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { ordersList, orderPending, orderFailed, orderMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(orderStateReset);
    if (orderFailed) {
      addToast(orderMessage, { appearance: "error", autoDismiss: true });
    }
    dispatch(getAllUserOrders());
  }, [dispatch, addToast, orderFailed, orderMessage]);
  return (
    <>
      {orderPending ? (
        <>
          <LoaderAnim />
        </>
      ) : (
        <div className="account_tab">
          <h3 className="account_heading">Orders</h3>
          {ordersList.length <= 0 && <>No Orders sofar</>}
          {ordersList.length > 0 && (
            <div className="overflow-y-scroll lg:overflow-hidden">
              <table className="w-full text-[14px] text-center">
                <thead>
                  <tr>
                    <th className="p-[10px] font-semibold bg-[#f8f8f8] border border-b-0 border-[#ccc]">
                      Order
                    </th>
                    <th className="p-[10px] font-semibold bg-[#f8f8f8] border border-b-0 border-[#ccc] min-w-[150px] w-auto">
                      Date
                    </th>
                    <th className="p-[10px] font-semibold bg-[#f8f8f8] border border-b-0 border-[#ccc]">
                      Status
                    </th>
                    <th className="p-[10px] font-semibold bg-[#f8f8f8] border border-b-0 border-[#ccc]">
                      Total
                    </th>
                    <th className="p-[10px] font-semibold bg-[#f8f8f8] border border-b-0 border-[#ccc]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order, i) => {
                    return (
                      <tr key={i}>
                        <td className="p-[10px] border border-[#ccc]">
                          {i + 1}
                        </td>
                        <td className="p-[10px] border border-[#ccc]">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-us",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="p-[10px] border border-[#ccc]">
                          {order.isPaid && order.isDelivered
                            ? "Completed"
                            : "Pending"}
                        </td>
                        <td className="p-[10px] border border-[#ccc]">
                          ${order.totalPrice}
                        </td>
                        <td className="p-[10px] border border-[#ccc]">
                          <Link
                            to={`/account/orders/${order._id}`}
                            className="text-black text-[15px] hover:text-primary_clr"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function AccountInfoForm() {
  const { user, authFailed, authMessage, authSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [newsletter, setNewsletter] = useState(false);
  const [offers, setoffers] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    newPassword: "",
    confirmPasswordNew: "",
    offers,
    newsletter,
    oldPassword: "",
  });

  const accountInfoFormSubmitHandler = (e) => {
    e.preventDefault();

    if (updateFormData.firstName !== "") {
      if (updateFormData.lastName === "") {
        addToast("Add your last name too!", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }
    }

    if (updateFormData.newPassword !== "") {
      if (updateFormData.newPassword.length < 7) {
        addToast("Password Too Short", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      } else if (
        updateFormData.newPassword !== updateFormData.confirmPasswordNew
      ) {
        addToast("Confirmed Password doesn't match with new!", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }
    }

    if (updateFormData.mobile !== "") {
      if (updateFormData.length < 12) {
        addToast("Please Provide A Valid mobile Mumber With Country Code", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }
    }

    if (updateFormData.oldPassword === "") {
      addToast("Current Password is required to confirm changes!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    let updateData = {};
    if (updateFormData.firstName) {
      updateData.fullname =
        updateFormData.firstName + " " + updateFormData.lastName;
    }
    if (updateFormData.newPassword) {
      updateData.newPassword = updateFormData.newPassword;
    }
    if (updateFormData.dob) {
      updateData.dob = updateFormData.dob;
    }
    if (updateFormData.mobile) {
      updateData.mobile = updateFormData.mobile;
    }
    updateData.newsletter = newsletter;
    updateData.offers = offers;
    updateData.oldPassword = updateFormData.oldPassword;

    dispatch(updateAUserAction(updateData));
  };

  useEffect(() => {
    dispatch(authStateReset());

    if (authFailed) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
    if (authSuccess) {
      addToast("Account info Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [dispatch, addToast, authFailed, authMessage, authSuccess]);

  return (
    <form className="mt-8" onSubmit={accountInfoFormSubmitHandler}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="mb-[20px] w-full md:w-1/2">
          <label
            htmlFor="firstname"
            className="text-[14px] capitalize block mb-[5px]"
          >
            First Name
          </label>
          <input
            type="text"
            placeholder="John"
            name="firstname"
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                firstName: e.target.value,
              })
            }
            className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-[98%]"
          />
        </div>
        <div className="mb-[20px] w-full md:w-1/2">
          <label
            htmlFor="lastname"
            className="text-[14px] capitalize block mb-[5px]"
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            name="lastname"
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, lastName: e.target.value })
            }
            className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-[98%]"
          />
        </div>
      </div>
      <div className="mb-[20px]">
        <label
          htmlFor="mobile"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Mobile Contact
        </label>
        <input
          type="text"
          name="mobile"
          placeholder="+123 5893 93222"
          onChange={(e) =>
            setUpdateFormData({ ...updateFormData, mobile: e.target.value })
          }
          className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] w-full"
        />
      </div>
      <div className="mb-[20px]">
        <label htmlFor="dob" className="text-[14px] capitalize block mb-[5px]">
          Date Of Birth
        </label>
        <input
          type="date"
          name="dob"
          onChange={(e) =>
            setUpdateFormData({ ...updateFormData, dob: e.target.value })
          }
          className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] w-full"
        />
      </div>
      <div className="mb-[20px]">
        <label
          htmlFor="email"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Email Address
        </label>
        <input
          type="email"
          disabled
          readOnly
          value={user ? user.email : "john@example.com"}
          name="email"
          className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] w-full"
        />
      </div>
      <fieldset className="mt-5 w-full">
        <legend className="text-[16px] mb-5 font-semibold pb-[10px] border-b border-[#ccc] w-full">
          Password change
        </legend>
        <div className="flex flex-col md:flex-row w-full">
          <div className="mb-[20px] w-full md:w-1/2">
            <label
              htmlFor="newpwd"
              className="text-[14px] capitalize block mb-[5px]"
            >
              New Password
            </label>
            <input
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  newPassword: e.target.value,
                })
              }
              type="password"
              placeholder="********"
              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538]  mx-auto w-full md:w-[98%]"
            />
          </div>
          <div className="mb-[20px] w-full md:w-1/2">
            <label
              htmlFor="confirmpwd"
              className="text-[14px] capitalize block mb-[5px]"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  confirmPasswordNew: e.target.value,
                })
              }
              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538]  mx-auto w-full md:w-[98%]"
            />
          </div>
        </div>
      </fieldset>
      <label className="checkbox-default" htmlFor="offers">
        <input
          className="w-[15px] h-[15px] mr-[2px] relative top-[2px]"
          type="checkbox"
          onChange={() => setoffers(!offers)}
        />
        <span className="ml-2">Receive offers from our partners</span>
      </label>
      <br />
      <label className="mb-3" htmlFor="newsletters">
        <input
          className="w-[15px] h-[15px] mr-[2px] relative top-[2px]"
          type="checkbox"
          onChange={() => setNewsletter(!newsletter)}
        />
        <span className="ml-2">
          Sign up for our newsletters
          <br />
          <em className="mt-[14px] block text-[14px]">
            You may unsubscribe at any moment. For that purpose, please find our
            contact info in the legal notice.
          </em>
        </span>
      </label>
      <div className="my-[20px]">
        <label
          htmlFor="currentpwd"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Current Password
        </label>
        <input
          type="password"
          onChange={(e) =>
            setUpdateFormData({
              ...updateFormData,
              oldPassword: e.target.value,
            })
          }
          placeholder="*******"
          className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] w-full"
        />
      </div>
      <div className="my-[20px]">
        <button
          type="submit"
          className="bg-primary_clr uppercase font-semibold py-[9px] px-[25px] text-white text-[13px] hover:bg-[#1f2226] transition-all"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

const Account = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [deleteMyAccount, setDeleteMyAccount] = useState(false);
  const { user, authPending } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateReset());
  }, [dispatch]);
  return (
    <>
      <BreadCrumbNav location={"My Account"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <div className="md:flex">
          <div className="flex flex-col md:mr-10">
            {[
              { link: "/account", icon: "icon-bubble", name: "Dashboard" },
              {
                link: "/account/orders",
                icon: "icon-arrow-down",
                name: "Orders",
              },
              {
                link: "/account/account-info",
                icon: "icon-user",
                name: "Account Details",
              },
              {
                icon: "icon-close",
                name: "Delete Account",
                delete: true,
              },
              { icon: "icon-logout", name: "Logout" },
            ].map((navLink, i) => {
              return (
                <div key={i}>
                  {!navLink.link ? (
                    !navLink.delete ? (
                      <span
                        className="border border-[#ccc] font-semibold text-[13px] block py-[15px] px-[15px] uppercase last:border-b hover:bg-primary_clr hover:border-primary_clr hover:text-[#fff] transition-all md:w-[200px] my-auto cursor-pointer"
                        onClick={() => {
                          dispatch(orderSuccessfullyPlacedAction());
                          dispatch(signOutAUserAction());
                        }}
                      >
                        <i className={`${navLink.icon} mr-[7px]`}></i>
                        {navLink.name}
                      </span>
                    ) : (
                      <>
                        {user ? (
                          user.products.length > 0 ? (
                            <></>
                          ) : (
                            <>
                              <span
                                className="border border-[#ccc] font-semibold text-[13px] block py-[15px] px-[15px] uppercase last:border-b hover:bg-primary_clr hover:border-primary_clr hover:text-[#fff] transition-all md:w-[200px] my-auto cursor-pointer"
                                onClick={() => setDeleteMyAccount(true)}
                              >
                                <i className={`${navLink.icon} mr-[7px]`}></i>
                                {navLink.name}
                              </span>
                              <DeleteUserConfirmationDialogue
                                deleteMyAccount={deleteMyAccount}
                                setDeleteMyAccount={setDeleteMyAccount}
                              />
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </>
                    )
                  ) : (
                    <Link
                      to={navLink.link}
                      className={`${
                        pathname === navLink.link
                          ? "bg-primary_clr border-primary_clr text-[#fff]"
                          : ""
                      } border border-[#ccc] border-b-0 font-semibold text-[13px] block py-[15px] px-[15px] uppercase hover:bg-primary_clr hover:border-primary_clr hover:text-[#fff] transition-all md:w-[200px] my-auto`}
                    >
                      <i className={`${navLink.icon} mr-[7px]`}></i>
                      {navLink.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          {authPending ? (
            <LoaderAnim />
          ) : (
            <div className="w-full">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="account_tab">
                      <h3 className="account_heading">Dashboard</h3>
                      <div className="welcome">
                        <p>
                          Hello,
                          <strong className="text-primary_clr font-semibold ml-1">
                            {user !== null ? user.fullname : "John Doe"}
                          </strong>
                          !
                        </p>
                      </div>

                      <p className="mt-5">
                        From your account dashboard. you can easily check & view
                        your{" "}
                        <Link
                          to={"/account/orders"}
                          className="text-primary_clr"
                        >
                          recent orders
                        </Link>
                        , manage and edit your{" "}
                        <Link
                          to={"/account/account-info"}
                          className="text-primary_clr"
                        >
                          password and account details
                        </Link>
                        .
                      </p>
                    </div>
                  }
                />
                <Route path="/orders" element={<UserOrdersRoute />} />
                <Route
                  path={`/orders/:orderId`}
                  element={<SingleOrderItem />}
                />
                <Route
                  path="/account-info"
                  element={
                    <div className="account_tab">
                      <div className="mb-16">
                        <p className="account_heading">Account Details</p>
                        <p className="mb-[15px]">
                          First name:{" "}
                          {user !== null ? (
                            <b className="ml-1">
                              {user.fullname.split(" ")[0]}
                            </b>
                          ) : (
                            "Not Set"
                          )}
                        </p>
                        <p className="mb-[15px]">
                          Last name:{" "}
                          {user !== null ? (
                            <b className="ml-1">
                              {user.fullname.split(" ")[1]}
                            </b>
                          ) : (
                            "Not Set"
                          )}
                        </p>
                        <p className="mb-[15px]">
                          Email Address:{" "}
                          {user !== null ? (
                            <b className="ml-1">{user.email}</b>
                          ) : (
                            "Not Set"
                          )}
                        </p>
                        <p className="mb-[15px]">
                          Date Of Birth:{" "}
                          {user !== null ? (
                            user.dob !== null ? (
                              <b className="ml-1">
                                {new Date(user.dob).toLocaleDateString(
                                  "en-us",
                                  {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </b>
                            ) : (
                              "Not Set"
                            )
                          ) : (
                            "No User"
                          )}
                        </p>
                        <p className="mb-[15px]">
                          Mobile:{" "}
                          {user !== null ? (
                            user.mobile !== "" ? (
                              <b>{user.mobile}</b>
                            ) : (
                              "Not Set"
                            )
                          ) : (
                            "Not Set"
                          )}
                        </p>
                      </div>
                      <div className="account_tab_edit">
                        <h3 className="account_heading">
                          Edit Account Details
                        </h3>
                        <p className="bg-white border-t-[3px] border-primary_clr text-[13px] py-[20px] px-0 text-[#333] font-semibold">
                          Only fill fields you want to EDIT!
                        </p>
                        <AccountInfoForm />
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
