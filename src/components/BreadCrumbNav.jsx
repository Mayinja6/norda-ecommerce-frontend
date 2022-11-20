import { Link } from "react-router-dom";

const BreadCrumbNav = ({ location }) => {
  return (
    <div className="py-[30px] px-0 bg-[#f0f4f6] flex justify-center items-center">
      <Link
        to="/"
        className="text-black transition-all font-bold hover:text-primary_clr text-[14px] md:text-[16px] capitalize relative before:absolute before:w-[18px] before:h-[1px] before:bg-[#5b5858] before:right-[-21px] before:content-[''] before:top-3 before:z-[9] before:rotate-[115deg]"
      >
        Home
      </Link>
      <span className="ml-[21px] font-semibold text-primary_clr text-[14px] md:text-[16px] capitalize relative">
        {location}
      </span>
    </div>
  );
};

export default BreadCrumbNav;
