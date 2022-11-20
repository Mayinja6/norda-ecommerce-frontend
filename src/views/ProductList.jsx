import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BreadCrumbNav,
  GetProductListByFilter,
  LoaderAnim,
  SingleProduct,
} from "../components";

const ProductList = () => {
  const { categories, productsSuccess } = useSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loadingStatus, setloadingStatus] = useState(false);
  const [selectedSortOrder, setSelectedSortOrder] = useState(1);
  const [dbProductList, setDbProductList] = useState([]);

  return (
    <>
      <BreadCrumbNav location="Shop" />
      <GetProductListByFilter
        loadingStatus={setloadingStatus}
        search={search}
        sortOrder={selectedSortOrder}
        productsListArray={setDbProductList}
      />

      {loadingStatus && (
        <>
          <h1>Loading Products, please wait...</h1>
          <LoaderAnim />
        </>
      )}
      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px] flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4">
          <div className="w-full mt-[30px] lg:mr-[20px]">
            <div className="sidebar-widget">
              <h4 className="text-[18px] font-semibold m-0 leading-[1]">
                Search
              </h4>
              <div className=" relative mt-[20px] mr-[20px] mb-3 lg:mb-0">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search here..."
                  className="border border-[#ddd] rounded-none h-[40px] pr-[60px] pl-[15px] w-full text-[14px] text-[#181818]"
                />
                <button className="bg-transparent border border-[#ddd] rounded-r-[5px] text-black hover:text-primary_clr text-[16px] md:text-[18px] h-full pr-[15px] pl-[14px] absolute right-0 top-[50%] -translate-y-1/2">
                  <i className="icon-magnifier"></i>
                </button>
              </div>
            </div>
            <div className="hidden lg:inline-block sidebar-widget shop-sidebar-border mb-35 pt-10">
              <h4 className="text-[18px] font-semibold m-0 leading-[1]">
                Categories
              </h4>
              <div className="mt-[18px]">
                <ul>
                  {productsSuccess &&
                    categories.slice(0, 6).map((oneCat, i) => {
                      return (
                        <li key={i} className="mb-[10px]">
                          <span
                            className="inline-block text-black hover:text-primary_clr cursor-pointer"
                            onClick={() => {
                              setCategory(oneCat);
                            }}
                          >
                            {oneCat}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 lg:sticky">
          <div className="border border-[#e9e9e9] flex py-[15px] px-[15px] md:px-[24px] justify-between items-center mb-[24px]">
            <p>Showing {dbProductList.length} results</p>
            <div className="product-sorting-wrapper">
              <div className="product-show shorting-style">
                <label className="text-black cursor-pointer mt-[3px] mr-[11px] text-[14px] font-medium">
                  Sort by :
                </label>
                <select
                  className="border border-[#ebebeb] text-black cursor-pointer text-[14px] pl-[30px] rounded-[3px] shadow-none outline-none"
                  onChange={(e) => setSelectedSortOrder(Number(e.target.value))}
                >
                  <option
                    className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                    value="1"
                  >
                    Default
                  </option>
                  <option
                    className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                    value="2"
                  >
                    Name Asc
                  </option>
                  <option
                    className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                    value="3"
                  >
                    Name Desc
                  </option>
                  <option
                    className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                    value="4"
                  >
                    price Asc
                  </option>
                  <option
                    className="bg-white border-0 border-[#626262] pl-[10px] text-[14px]"
                    value="5"
                  >
                    price Desc
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {!loadingStatus && dbProductList.length <= 0 && (
              <h1>No Products found in the Database Contat Admins</h1>
            )}
            {!loadingStatus && dbProductList.length > 0 && (
              <>
                {category === "All"
                  ? dbProductList.map((product, index) => {
                      return <SingleProduct key={index} product={product} />;
                    })
                  : dbProductList
                      .filter((item) => item.category === category)
                      .map((product, index) => {
                        return <SingleProduct key={index} product={product} />;
                      })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
