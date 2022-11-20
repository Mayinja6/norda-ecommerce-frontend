import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NordaLogo } from "../assets";

import { Drawer } from "@mui/material";
import { CartDrawer, MobileDrawer } from "./../components";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);
  // const [searchInputAvailable, setSearchInputAvailable] = useState(false);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);

  return (
    <div className="shadow-md w-full flex items-center justify-between p-5 md:py-10 md:px-[50px]  lg:px-[100px]">
      <Link to="/">
        <img src={NordaLogo} alt="logo" />
      </Link>
      <nav className="hidden lg:block">
        <ul>
          {[
            { link: "Home", to: "/" },
            { link: "Shop", to: "/products" },
            { link: "About Us", to: "/about" },
            { link: "Contact", to: "/contact" },
          ].map((link, i) => {
            return (
              <li key={i} className="inline-block relative uppercase">
                <span className=" pr-[46px] ">
                  <Link
                    to={link.to}
                    className="hover:text-primary_clr transition-colors font-bold text-[16px]"
                  >
                    {link.link}
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex justify-end header-action mr-[13px]">
        <div className="hidden lg:inline-block mr-[20px] sm:mr-[25px] lg:[mr-30px] relative">
          <Link to={"/products"}>
            <span className="z-[99] cursor-pointer">
              <i className="icon-magnifier s-open hover:text-primary_clr text-[18px] block"></i>
            </span>
          </Link>
        </div>

        {/* <ClickAwayListener onClickAway={() => setSearchInputAvailable(false)}>
          <div className="hidden lg:inline-block mr-[20px] sm:mr-[25px] lg:[mr-30px] relative">
            <span
              className="z-[99] cursor-pointer"
              onClick={() => setSearchInputAvailable(!searchInputAvailable)}
            >
              <i className="icon-magnifier s-open hover:text-primary_clr text-[18px] block"></i>
            </span>
            {searchInputAvailable ? (
              <div
                className={`bg-transparent absolute right-0 top-[50%] -translate-y-1/2 ${
                  !searchInputAvailable && "hidden z-[-99]"
                } w-[300px] pb-[1px] mr-[25px] transition-all`}
              >
                <div className="relative overflow-hidden">
                  <input
                    placeholder="Search products…"
                    type="text"
                    className="bg-white border border-[#e2dcdc] text-black leading-[30px] py-[2px] pr-[60px] pl-[20px] w-full placeholder:text-black placeholder:opacity-100"
                  />
                  <button className="absolute right-0 top-[50%] -translate-y-1/2 p-0 bg-transparent h-full border-l border-[#e2dcdc] py-0 px-[15px] text-black  hover:text-primary_clr cursor-pointer">
                    <i className="icon-magnifier hover:text-primary_clr font-semibold"></i>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </ClickAwayListener> */}

        {user !== null ? (
          <div className="mr-[20px] sm:mr-[25px] lg:[mr-30px] relative cursor-pointer">
            <Link to={"/account"}>
              <span className="bg-primary_clr rounded-[50%] w-2 h-2 absolute right-[-4px] top-[-4px]"></span>
              <i
                className={`icon-user hover:text-primary_clr text-[18px] font-semibold`}
              ></i>
            </Link>
          </div>
        ) : (
          <div className="mr-[20px] sm:mr-[25px] lg:[mr-30px]">
            <Link to="/auth/signin">
              <i
                className={`icon-user hover:text-primary_clr text-[18px] font-semibold`}
              ></i>
            </Link>
          </div>
        )}

        <div className="relative mr-[20px] sm:mr-[25px] lg:[mr-30px]">
          <Link to="/wishlist">
            <i className="icon-heart  hover:text-primary_clr text-[18px] font-semibold"></i>
            {wishlistItems.length > 0 && (
              <span className="bg-primary_clr absolute top-[-8px] text-[10px] md:text-[12px] w-[20px] md:w-[20px] h-[18px] md:h-[20px] inline-block leading-[19px] text-white text-center left-[14px] rounded-[50px] font-semibold">
                {wishlistItems.length < 10
                  ? `0${wishlistItems.length}`
                  : wishlistItems.length}
              </span>
            )}
          </Link>
        </div>
        <div className="relative mr-[20px] sm:mr-[25px] lg:[mr-30px] header-cart">
          <span
            onClick={() => setOpenCartDrawer(true)}
            className="cursor-pointer"
          >
            <i className="icon-basket-loaded  hover:text-primary_clr text-[18px] font-semibold"></i>

            {cartItems.length > 0 && (
              <span className="bg-primary_clr absolute top-[-8px] text-[10px] md:text-[12px] w-[20px] md:w-[20px] h-[18px] md:h-[20px] inline-block leading-[19px] text-white text-center left-[14px] rounded-[50px] font-semibold">
                {cartItems.length < 10
                  ? `0${cartItems.length}`
                  : cartItems.length}
              </span>
            )}
          </span>
          <Drawer
            open={openCartDrawer}
            anchor="right"
            onClose={() => setOpenCartDrawer(false)}
          >
            <CartDrawer setOpenCartDrawer={setOpenCartDrawer} />
          </Drawer>
        </div>
        <div className="mobile_menu_btn cursor-pointer lg:hidden">
          <i
            className="icon-menu  hover:text-primary_clr text-[18px] font-semibold"
            onClick={() => setOpenMobileDrawer(true)}
          ></i>
          <Drawer
            open={openMobileDrawer}
            anchor="right"
            onClose={() => setOpenMobileDrawer(false)}
            sx={{
              transition: "0.3s all ease-in-out",
            }}
          >
            <MobileDrawer setOpenMobileDrawer={setOpenMobileDrawer} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Header;
