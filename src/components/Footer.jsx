import { Link, useLocation } from "react-router-dom";
import { NordaLogo } from "../assets";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <footer className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px] bg-[#f7faee]">
      <div className="footer_newsletter py-10 md:flex w-full">
        <div className="section-title w-full md:w-[40%] mb-5 md:mb-0">
          <h2 className="uppercase font-bold leading-[1.5]">keep connected</h2>
          <p>Get updates by subscribe our weekly newsletter</p>
        </div>
        <div className="subscribe-form w-full md:w-[60%]">
          <div className="mc-form w-full relative">
            <input
              className="email text-[#999] py-[2px] pr-[115px] pl-[30px] bg-transparent border-b border-[#999] h-[55px] placeholder:text-[#999] placeholder:opacity-100 w-full"
              type="email"
              placeholder="Enter your email address"
            />
            <span className=" text-[18px] absolute left-0 top-[50%] -translate-y-1/2">
              <i className="icon-envelope-open"></i>
            </span>
            <div className="absolute right-0 top-[50%] -translate-y-1/2">
              <button className="text-white bg-primary_clr w-auto h-auto font-bold uppercase py-[17px] px-8 transition-all hover:bg-black">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_content flex flex-col md:flex-row items-center md:justify-between">
        <div className="w-full p-3 sm:w-3/4 md:w-1/2">
          <div className="contact-info-wrap">
            <div className="mb-[25px] md:mb-[30px]">
              <span className="inline-block">
                <Link to="/">
                  <img src={NordaLogo} alt="logo" />
                </Link>
              </span>
            </div>
            <div className="mb-[25px] md:mb-[30px]">
              <span className="text-[13px] uppercase block text-[#666]">
                Our Location
              </span>
              <p className="text-[18px] text-black mt-[6px]">
                869 General Village Apt. 645, Moorebury, USA
              </p>
            </div>
            <div className="mb-[25px] md:mb-[30px]">
              <span className="text-[13px] uppercase block text-[#666]">
                24/7 hotline:
              </span>
              <p className="text-[18px] text-black mt-[6px]">
                (+99) 052 128 2399
              </p>
            </div>
          </div>
        </div>
        <div className="footer-right-wrap w-full p-3 sm:w-3/4 md:w-1/2">
          <div className="footer-menu">
            <ul className="flex items-center justify-evenly md:justify-between">
              <li>
                <Link
                  to="/"
                  className={`uppercase text-[12px] md:text-[14px] font-semibold hover:text-primary_clr ${
                    pathname === "/" ? "text-primary_clr" : ""
                  }`}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={`uppercase text-[12px] md:text-[14px] font-semibold hover:text-primary_clr ${
                    pathname === "/products" ? "text-primary_clr" : ""
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signin"
                  className={`uppercase text-[12px] md:text-[14px] font-semibold hover:text-primary_clr ${
                    pathname === "/auth" ? "text-primary_clr" : ""
                  }`}
                >
                  Auth
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`uppercase text-[12px] md:text-[14px] font-semibold hover:text-primary_clr ${
                    pathname === "/about" ? "text-primary_clr" : ""
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`uppercase text-[12px] md:text-[14px] font-semibold hover:text-primary_clr ${
                    pathname === "/contact" ? "text-primary_clr" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-[23px] md:mt-[37px] mx-0 mb-[25px] md:mb-[86px] flex md:justify-end">
            <a
              href="/"
              className="transition-all flex items-center justify-center border border-[#cfcfcf] w-[40px] h-[40px] text-center rounded-[100%] hover:text-white hover:border-primary_clr hover:bg-primary_clr mr-[8px]"
            >
              <i className="icon-social-twitter text-lg"></i>
            </a>
            <a
              href="/"
              className="transition-all flex items-center justify-center border border-[#cfcfcf] w-[40px] h-[40px] text-center rounded-[100%] hover:text-white hover:border-primary_clr hover:bg-primary_clr mr-[8px]"
            >
              <i className="icon-social-github text-lg"></i>
            </a>
            <a
              href="/"
              className="transition-all flex items-center justify-center border border-[#cfcfcf] w-[40px] h-[40px] text-center rounded-[100%] hover:text-white hover:border-primary_clr hover:bg-primary_clr mr-[8px]"
            >
              <i className="icon-social-google text-lg"></i>
            </a>
            <a
              href="/"
              className="transition-all flex items-center justify-center border border-[#cfcfcf] w-[40px] h-[40px] text-center rounded-[100%] hover:text-white hover:border-primary_clr hover:bg-primary_clr mr-[8px]"
            >
              <i className="icon-social-dribbble text-lg"></i>
            </a>
            <a
              href="/"
              className="transition-all flex items-center justify-center border border-[#cfcfcf] w-[40px] h-[40px] text-center rounded-[100%] hover:text-white hover:border-primary_clr hover:bg-primary_clr"
            >
              <i className="icon-social-spotify text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
