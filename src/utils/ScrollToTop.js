import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollposition } from "./useScrollPosition";

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export function ScrollToTopParams() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function ScrollToTopBtn() {
  const scrollPosition = useScrollposition();
  return (
    <>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className={`transition-opacity fixed w-10 h-10 bg-transparent rounded-md text-[#666] right-[15px] md:right-[70px] bottom-[120px] text-center overflow-hidden border border-[#666] ${
          scrollPosition > 150 ? "z-[999] opacity-100" : "z-[-999] opacity-0"
        } hover:text-white hover:border-primary_clr hover:bg-primary_clr`}
      >
        <i className="icon-arrow-up block leading-[40px] md:leading-[38px] text-[16px] md:text-[18px]"></i>
      </button>
    </>
  );
}
