import { BreadCrumbNav } from "../components";
import {
  NordaLogo,
  brandLogo1,
  brandLogo2,
  brandLogo3,
  brandLogo4,
  brandLogo5,
  brandLogo6,
} from "../assets";

const About = () => {
  return (
    <>
      <BreadCrumbNav location={"About Us"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <div className="aboutDescription py-[60px] md:py-[96px] md:flex">
          <div className="w-full md:w-1/4 mb-5 md:mb-0">
            <img src={NordaLogo} alt="logo" />
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-6 font-bold m-0 uppercase">Introduce</h3>
            <p className="text-lg md:text-5 md:leading-[36px] mt-[23px] mx-0 mb-[45px] w-full md:w-[93%]">
              Norda store is an Ecommerce website that offers fashion,
              electroincs and other quality goodies at the best price. It has
              since it was founded in 2018 grown into one of the best online
              stores sofar. The content of this site is copyright-protected and
              is the property of R4DEV Company.
            </p>
            <h2 style={{ fontFamily: "Monotype Corsiva" }}>David Moye</h2>
          </div>
        </div>
        <div className="aboutServices w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-between items-center border border-[#ebebeb] py-5">
          <div className="serviceBrand flex justify-center items-center my-[30px] sm:border-r sm:selection:border-[#ebebeb]">
            <div className="mr-[25px]">
              <i className="text-[34px] text-primary_clr transition-all icon-cursor"></i>
            </div>
            <div className="flex items-center justify-center flex-col ">
              <h3 className="text-lg font-semibold mb-[5px]">Free Shipping</h3>
              <p className="m-0">Orders over $99</p>
            </div>
          </div>
          <div className="serviceBrand flex justify-center items-center my-[30px] md:border-r md:border-[#ebebeb]">
            <div className="mr-[25px]">
              <i className="text-[34px] text-primary_clr transition-all icon-refresh "></i>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-lg font-semibold mb-[5px]">90 Days Return</h3>
              <p className="m-0">For any problems</p>
            </div>
          </div>
          <div className="serviceBrand flex justify-center items-center my-[30px] lg:border-r lg:border-[#ebebeb]">
            <div className="mr-[25px]">
              <i className="text-[34px] text-primary_clr transition-all icon-credit-card "></i>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-lg font-semibold mb-[5px]">Secure Payment</h3>
              <p className="m-0">100% Guarantee</p>
            </div>
          </div>
          <div className="serviceBrand flex justify-center items-center my-[30px]">
            <div className="mr-[25px]">
              <i className="text-[34px] text-primary_clr transition-all icon-earphones "></i>
            </div>
            <div className="flex items-center justify-center flex-col">
              <h3 className="text-lg font-semibold mb-[5px]">24h Support</h3>
              <p className="m-0">Dedicated support</p>
            </div>
          </div>
        </div>
        <div className="aboutTeam pt-[60px] md:pt-[96px]">
          <h2 className="mb-[45px] text-center text-[22px] md:text-[24px] font-bold uppercase m-0">
            Team Members
          </h2>
          <div className="grid justify-center items-center gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                name: "Mr. Mike Banding",
                img: NordaLogo,
                role: "Manager",
                facebook: "https://www.facebook.com/",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
              },
              {
                name: "Mr. Peter Pan",
                img: NordaLogo,
                role: "Developer",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
              },
              {
                name: "Ms. Sophia",
                img: NordaLogo,
                role: "Developer",
                facebook: "https://www.facebook.com/",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
              },
              {
                name: "Mr. John Lee",
                img: NordaLogo,
                role: "Chairmen",
                facebook: "https://www.facebook.com/",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
              },
            ].map((teamMember, i) => {
              return (
                <div
                  key={i}
                  className="teamWrapper mb-[30px] border border-[#ebebeb]"
                >
                  <div className="overflow-hidden relative w-full h-[300px] flex justify-center p-5">
                    <div className="flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full"
                        src={teamMember.img}
                        alt=""
                      />
                    </div>
                    <div className="teamWrapperSocial absolute bg-white opacity-0 invisible left-0 p-[10px] right-0 text-center top-[70%] -translate-y-1/2 transition-all duration-700 w-full z-[5] flex items-center justify-center">
                      {teamMember.facebook && (
                        <a
                          className="border border-[#3b5998] bg-[#3b5998] hover:bg-transparent hover:text-[#3b5998] text-white text-[12px] transition-all my-0 mx-[7px] text-center flex items-center justify-center p-2 rounded-[50%] h-full relative"
                          target={"_blank"}
                          rel="noreferrer"
                          href={teamMember.facebook}
                        >
                          <i className="icon-social-facebook"></i>
                        </a>
                      )}
                      {teamMember.twitter && (
                        <a
                          className="border border-[#55acee] bg-[#55acee] hover:bg-transparent hover:text-[#55acee] text-white text-[12px] transition-all my-0 mx-[7px] text-center flex items-center justify-center p-2 rounded-[50%] h-full relative"
                          target={"_blank"}
                          rel="noreferrer"
                          href={teamMember.twitter}
                        >
                          <i className="icon-social-twitter"></i>
                        </a>
                      )}
                      {teamMember.instagram && (
                        <a
                          className="border border-[#c32aa3] bg-[#c32aa3] hover:bg-transparent hover:text-[#c32aa3] text-white text-[12px] transition-all my-0 mx-[7px] text-center flex items-center justify-center p-2 rounded-[50%] h-full relative"
                          target={"_blank"}
                          rel="noreferrer"
                          href={teamMember.instagram}
                        >
                          <i className="icon-social-instagram"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="teamWrapperContent text-center">
                    <h4 className="text-[18px] font-medium mb-[5px] capitalize text-black">
                      {teamMember.name}
                    </h4>
                    <span className="text-[15px] italic text-black">
                      {teamMember.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="aboutBrands flex items-center justify-between flex-wrap pt-[60px] md:pt-[96px]">
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 hover:opacity-100 transition-all scale-1 hover:scale-110"
                src={brandLogo1}
                alt="brand-logo"
              />
            </div>
          </div>
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 transition-all scale-90 hover:scale-100"
                src={brandLogo2}
                alt="brand-logo"
              />
            </div>
          </div>
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 transition-all scale-90 hover:scale-100"
                src={brandLogo3}
                alt="brand-logo"
              />
            </div>
          </div>
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 transition-all scale-90 hover:scale-100"
                src={brandLogo4}
                alt="brand-logo"
              />
            </div>
          </div>
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 transition-all scale-90 hover:scale-100"
                src={brandLogo5}
                alt="brand-logo"
              />
            </div>
          </div>
          <div className="singleBrandLogo mb-[30px]">
            <div className="flex items-center justify-center">
              <img
                className="max-w-full opacity-40 transition-all scale-90 hover:scale-100"
                src={brandLogo6}
                alt="brand-logo"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
      .teamWrapper:hover .teamWrapperSocial {
        visibility: visible;
        opacity: 1;
        top: 50%;
      }
      .teamWrapperContent {
        padding: 20px 10px 21px;
        box-shadow: 0 3px 5px rgba(85, 85, 85, 0.2);
      }
      .singleBrandLogo {
        flex: 0 0 16.63%;
        max-width: 16.63%;
        text-align: center;
      }
      @media only screen and (min-width: 768px) and (max-width: 991px) {
        .singleBrandLogo {
          flex: 0 0 33.333%;
          max-width: 33.333%;
        }
      }
      
      @media only screen and (max-width: 767px) {
        .singleBrandLogo {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      
      @media only screen and (min-width: 576px) and (max-width: 767px) {
        .singleBrandLogo {
          flex: 0 0 33.333%;
          max-width: 33.333%;
        }
      }
      
      .singleBrandLogo:first-child {
        text-align: left;
      }
      `}</style>
    </>
  );
};

export default About;
