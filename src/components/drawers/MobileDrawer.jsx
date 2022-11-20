import { Link } from "react-router-dom";

const MobileDrawer = ({ setOpenMobileDrawer }) => {
  const linkAndUrls = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "shop",
      to: "/products",
      nestedLinks: [
        { name: "shopping Cart", to: "/cart" },
        { name: "Shopping Wishlist", to: "/wishlist" },
        { name: "Checkout", to: "/checkout" },
      ],
    },
    {
      name: "Pages",
      to: "/",
      nestedLinks: [
        { name: "about us", to: "/about" },
        { name: "contact", to: "/contact" },
        { name: "Privacy Policy", to: "/privacy-policy" },
        { name: "my account", to: "/account" },
      ],
    },
  ];
  return (
    <div className="w-[300px] md:w-[400px]">
      <div className="px-[20px] md:px-[30px] mt-[80px] mb-[20px]">
        <span
          className="absolute top-[20px] right-[20px] md:right-[30px] leading-[30px] text-black"
          onClick={() => setOpenMobileDrawer(false)}
        >
          <i className="icon-close"></i>
        </span>
        <div>
          <div className="header-offer-wrap mb-[17px] border-b border-[#ddd]">
            <p>
              <i className="icon-paper-plane"></i> FREE SHIPPING world wide for
              all orders over <span>$199</span>
            </p>
          </div>
          <div className="mobile-search  mb-[17px] pb-[30px] border-b border-[#ddd]">
            <form className="relative">
              <input
                type="text"
                placeholder="Search here…"
                className="bg-[#f6f6f6] border-none rounded-none h-[50px] pr-[60px] pl-[15px] w-full text-[14px] text-[#181818]"
              />
              <button className="bg-transparent border border-[#ddd] rounded-r-[5px] text-black hover:text-primary_clr text-[16px] md:text-[18px] h-full pr-[15px] pl-[14px] absolute right-0 top-[50%] -translate-y-1/2">
                <i className="icon-magnifier inline-block mt-[5px]"></i>
              </button>
            </form>
          </div>
          <nav className="mobile-menu-wrap mb-[20px] pb-[17px] border-b border-[#ddd] h-full">
            <ul className="mobile-menu">
              {linkAndUrls.map((link, i) => {
                return (
                  <li key={i} className="menu-item-has-children g-[50px]">
                    <span className="flex items-center justify-between">
                      <Link
                        to={link.to}
                        onClick={() => setOpenMobileDrawer(false)}
                        className="cursor-pointer hover:text-primary_clr transition-all text-[16px] capitalize relative inline-block py-[10px] px-0 text-black"
                      >
                        {link.name}
                      </Link>
                    </span>

                    <ul className="h-full overflow-hidden">
                      {link.nestedLinks &&
                        link.nestedLinks.map((nestedLink, i) => {
                          return (
                            <li key={i}>
                              <Link
                                onClick={() => setOpenMobileDrawer(false)}
                                to={nestedLink.to}
                                className="cursor-pointer hover:text-primary_clr transition-all px-[15px] pb-[5px] pt-[10px] text-[#333] text-[14px] capitalize"
                              >
                                {nestedLink.name}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mb-[30px] pb-[24px] border-b border-[#ddd]">
            <ul>
              <li className="flex mb-[14px] text-[15px]">
                <i className="icon-phone text-[14px] mr-3 relative top-1"></i>{" "}
                <a
                  href="tel:(+612) 2531 5600"
                  className="hover:text-primary_clr transition-all"
                >
                  (+612) 2531 5600
                </a>
              </li>
              <li className="flex mb-[14px] text-[15px]">
                <i className="icon-envelope-open text-[14px] mr-3 relative top-1"></i>{" "}
                <a
                  href="mailto:norda@domain.com"
                  className="hover:text-primary_clr transition-all"
                >
                  norda@sales.com
                </a>
              </li>
              <li className="flex text-[15px]">
                <i className="icon-home text-[14px] mr-3 relative top-1"></i> PO
                Box 1622 Colins Street West Australia
              </li>
            </ul>
          </div>
          <div className="mobile-social-icon flex items-center">
            <a
              className="transition-colors border border-[#3b5999] hover:text-[#3b5999] bg-[#3b5999] hover:bg-transparent flex items-center justify-center w-[33px] h-[33px] text-center rounded-[100%] text-white text-[15px] mr-[10px]"
              href="/"
            >
              <i className="icon-social-facebook"></i>
            </a>
            <a
              className="transition-colors border border-[#55acee] hover:text-[#55acee] bg-[#55acee] hover:bg-transparent flex items-center justify-center w-[33px] h-[33px] text-center rounded-[100%] text-white text-[15px] mr-[10px]"
              href="/"
            >
              <i className="icon-social-twitter"></i>
            </a>
            <a
              className="transition-colors border border-[#bd081c] hover:text-[#bd081c] bg-[#bd081c] hover:bg-transparent flex items-center justify-center w-[33px] h-[33px] text-center rounded-[100%] text-white text-[15px] mr-[10px]"
              href="/"
            >
              <i className="icon-social-pinterest"></i>
            </a>
            <a
              className="transition-colors border border-[#e4405f] hover:text-[#e4405f] bg-[#e4405f] hover:bg-transparent flex items-center justify-center w-[33px] h-[33px] text-center rounded-[100%] text-white text-[15px]"
              href="/"
            >
              <i className="icon-social-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
