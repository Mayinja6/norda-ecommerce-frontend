import { BreadCrumbNav } from "../components";

const Contact = () => {
  return (
    <>
      <BreadCrumbNav location={"Contact Us"} />
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <div className="contact-info-wrap-3 pb-85">
          <h3 className="capitalize text-[25px] font-semibold my-[48px]">
            contact info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-[#f7f7f7] pt-[48px] md:pt-[28px] px-[10px] md:px-[20px] pb-[49px] md:pb-[29px] text-center mb-30">
              <i className="icon-location-pin text-[20px] text-primary_clr transition-all block"></i>
              <h4 className="text-[20px] font-semibold capitalize mt-[19px] md:mt-[12px] mx-0 mb-[10px]">
                our address
              </h4>
              <p className="text-[15px] text-black">77 seventh Street, USA. </p>
            </div>
            <div className="bg-[#f7f7f7] py-[48px] px-[10px] text-center">
              <ul>
                <li className="border-b border-[#fff] mb-[23px] pb-[26px] text-[15px] flex flex-wrap justify-center">
                  <i className="icon-screen-smartphone  mr-[7px] text-[20px] text-primary_clr transition-all block"></i>{" "}
                  716-298-1822{" "}
                </li>
                <li className="text-[15px] flex flex-wrap justify-center">
                  <i className="icon-envelope mr-[7px] text-[20px] text-primary_clr transition-all block"></i>{" "}
                  <a href="mailto:info@example.com">info@example.com</a>
                </li>
              </ul>
            </div>
            <div className="bg-[#f7f7f7] pt-[48px] md:pt-[28px] px-[10px] md:px-[20px] pb-[49px] md:pb-[29px] text-center mb-30">
              <i className="icon-clock text-[20px] text-primary_clr transition-all block"></i>
              <h4 className="text-[20px] font-semibold capitalize mt-[19px] md:mt-[12px] mx-0 mb-[10px]">
                openning hour
              </h4>
              <p className="text-[15px] text-black">
                Monday - Friday. 9:00am - 5:00pm{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="get-in-touch-wrap">
          <h3 className="capitalize text-[25px] font-semibold my-[48px]">
            Get In Touch
          </h3>
          <div className="contact-from contact-shadow w-full flex flex-wrap">
            <input
              className="bg-[#f7f7f7] text-black h-[60px] py-[2px] px-[20px] mb-[20px] md:mb-[30px] relative mr-[1%] w-full md:w-[49%]"
              name="name"
              type="text"
              placeholder="Name"
            />
            <input
              className="bg-[#f7f7f7] text-black h-[60px] py-[2px] px-[20px] mb-[20px] md:mb-[30px] relative ml-[1%] w-full md:w-[49%]"
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              className="bg-[#f7f7f7] text-black h-[60px] py-[2px] px-[20px] mb-[20px] md:mb-[30px] relative w-full"
              name="subject"
              type="text"
              placeholder="Subject"
            />
            <textarea
              className="bg-[#f7f7f7] text-black h-[200px] py-[20px] px-[20px] mb-[20px] md:mb-[30px] relative w-full"
              name="message"
              placeholder="Your Message"
            ></textarea>
            <div className="w-full">
              <button
                className="bg-primary_clr text-white transition-all hover:bg-black capitalize py-3 px-[30px] text-[15px] font-semibold"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
        <div className="contact-map pt-120">
          <div id="map"></div>
        </div>
      </div>
    </>
  );
};

export default Contact;
