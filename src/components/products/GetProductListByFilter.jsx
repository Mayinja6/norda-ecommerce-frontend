import axios from "axios";
import { useEffect } from "react";

const GetProductListByFilter = ({
  loadingStatus,
  search,
  productsListArray,
  sortOrder,
}) => {
  useEffect(() => {
    const sortOptions = {
      1: "order",
      2: "order=asc",
      3: "order=desc",
      4: "price=1",
      5: "price=-1",
    };
    async function dbProducts(search) {
      loadingStatus(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/?${
          search !== "" ? `s=${search}` : `s`
        }&${sortOptions[sortOrder]}`
      );
      await productsListArray(data);
      loadingStatus(false);
    }
    dbProducts(search);
  }, [search, productsListArray, sortOrder, loadingStatus]);

  return null;
};

export default GetProductListByFilter;
