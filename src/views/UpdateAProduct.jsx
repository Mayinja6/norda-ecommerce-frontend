import { useCallback, useState, useEffect } from "react";
import { BreadCrumbNav, LoaderAnim } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useToasts } from "react-toast-notifications";
import {
  updateAProductByIdAction,
  productsStateReset,
} from "../redux/slices/ProductsSlice";
import { useLocation, Link, Routes, Route, useParams } from "react-router-dom";
const UpdateAProduct = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [image, setImage] = useState([]);
  const { productId } = useParams();
  const { pathname } = useLocation();
  const product = useSelector(
    (state) =>
      state.products.products.filter((product) => product._id === productId)[0]
  );
  const [updateProductForm, setUpdateProductForm] = useState({
    title: "",
    description: "",
    countInStock: "",
    price: "",
    category: "",
    brand: "",
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const allImagesInfo = [];
      acceptedFiles.map((file) => {
        const oneImg = {
          preview: URL.createObjectURL(file),
          data: file,
        };
        return allImagesInfo.push(oneImg);
      });
      setImage(allImagesInfo);
    },
    [setImage]
  );

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [".png", ".jpeg", ".jpg"] } });

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();

    const { title, description, price, category, countInStock, brand } =
      updateProductForm;

    if (title !== "") {
      if (title.length < 10) {
        addToast("Choose a more sensible title", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }
    }
    if (description !== "") {
      if (description.length < 50) {
        addToast("A minimum of 50 chars is required", {
          appearance: "info",
          autoDismiss: true,
        });
        return;
      }
    }

    let newUpdateFormData = new FormData();
    if (image.length > 0) newUpdateFormData.append("product", image[0].data);
    if (title !== "") newUpdateFormData.append("title", title);
    if (description !== "")
      newUpdateFormData.append("description", description);
    if (price !== "") newUpdateFormData.append("price", price);
    if (countInStock !== "")
      newUpdateFormData.append("countInStock", countInStock);
    if (category !== "") newUpdateFormData.append("category", category);
    if (brand !== "") newUpdateFormData.append("brand", brand);

    dispatch(
      updateAProductByIdAction({
        productId: product._id,
        productData: newUpdateFormData,
      })
    );
  };
  const { productsPending, productsSuccess, newCreated } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(productsStateReset());
    if (newCreated) {
      addToast("Product Updated Successdully!", {
        appearance: "info",
        autoDismiss: true,
      });
    }
  }, [dispatch, addToast, newCreated]);

  return (
    <>
      <BreadCrumbNav location={"Update Product"} />
      {productsPending && (
        <>
          <LoaderAnim />
        </>
      )}

      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <div className="md:flex">
          <div className="flex flex-col md:mr-10">
            <Link to={`/products/update/${productId}`}>
              <span
                className={`${
                  pathname === `/products/update/${productId}`
                    ? "bg-primary_clr border-primary_clr text-white"
                    : ""
                } border border-[#ccc] font-semibold text-[13px] block py-[15px] px-[15px] uppercase last:border-b hover:bg-primary_clr hover:border-primary_clr hover:text-[#fff] transition-all md:w-[200px] my-auto cursor-pointer`}
              >
                Product Info
              </span>
            </Link>
            <Link to={`/products/update/${productId}/edit`}>
              <span
                className={`${
                  pathname === `/products/update/${productId}/edit`
                    ? "bg-primary_clr border-primary_clr text-white"
                    : ""
                } border border-[#ccc] font-semibold text-[13px] block py-[15px] px-[15px] uppercase last:border-b hover:bg-primary_clr hover:border-primary_clr hover:text-[#fff] transition-all md:w-[200px] my-auto cursor-pointer`}
              >
                Edit Product
              </span>
            </Link>
          </div>
          <div className="w-full mt-10 md:mt-0">
            {productsSuccess && (
              <>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <div className="account_tab">
                          <h1 className="account_heading">Product Details</h1>
                          <div className="mb-5 flex items-center justify-center h-[200px]">
                            <img
                              className="max-w-full max-h-full"
                              src={`${process.env.REACT_APP_BACKEND_URL}/api/products/img/${product.image.filename}`}
                              alt=""
                            />
                          </div>
                          <p className="mb-[15px]">
                            Title: <b className="ml-1">{product.title}.</b>
                          </p>
                          <p className="mb-[15px]">
                            Desctiption:{" "}
                            <b className="ml-1">{product.description}.</b>
                          </p>
                          <p className="mb-[15px]">
                            Price: <b className="ml-1">${product.price}.</b>
                          </p>
                          <p className="mb-[15px]">
                            Count in stock:{" "}
                            <b className="ml-1">
                              {product.countInStock}{" "}
                              {product.countInStock > 1 && "items"}
                              {product.countInStock === 1 && "item"}
                            </b>
                          </p>
                          <p className="mb-[15px]">
                            Category:{" "}
                            <b className="ml-1">{product.category}.</b>
                          </p>
                          <p className="mb-[15px]">
                            Brand: <b className="ml-1">{product.brand}.</b>
                          </p>
                          <p className="mb-[15px]">
                            Discount:{" "}
                            <b className="ml-1">
                              {product.discount > 0
                                ? `-${product.discount}%`
                                : `No Discount`}
                              .
                            </b>
                          </p>
                        </div>
                      </>
                    }
                  />
                  <Route
                    path="/edit"
                    element={
                      <div className="account_tab">
                        <h1 className="account_heading">
                          Edit Product Information
                        </h1>
                        <p className="bg-white border-t-[3px] border-primary_clr text-[13px] py-[20px] px-0 text-[#333] font-semibold">
                          Only fill fields you want to EDIT!
                        </p>
                        <div className="DROPZONE">
                          <div
                            {...getRootProps({
                              className: `dropzone rounded-[4px] ${
                                isDragAccept && "dropZoneAccept"
                              } ${isDragReject && "dropZoneReject"}`,
                            })}
                          >
                            <input
                              className="input-zone"
                              {...getInputProps()}
                            />
                            {!isDragActive && (
                              <p className="dropzone-content text-center italic text-[#7c7c7c]">
                                Drag n' Drop some files here, orClick to Select
                              </p>
                            )}
                            {isDragReject && (
                              <p className="dropzone-content text-center italic text-[#7c7c7c]">
                                Some Files Will be Rejected
                              </p>
                            )}
                            {isDragAccept && (
                              <p className="dropzone-content text-center italic text-[#7c7c7c]">
                                All Files Will be Accepted
                              </p>
                            )}
                          </div>
                          <div className="imagePreview my-5">
                            <div className="flex justify-between py-2 border-b last:border-b-0 pl-2">
                              {image.length > 0 ? (
                                <>
                                  <img
                                    className="max-w-[50px] max-h-[50px]"
                                    src={image[0].preview}
                                    alt="ImagePreview"
                                  />
                                  <span>
                                    {image[0].data.size > 1000000 ? (
                                      <>
                                        {(image[0].data.size / 1000000).toFixed(
                                          1
                                        )}{" "}
                                        mbs
                                      </>
                                    ) : (
                                      <>
                                        {(image[0].data.size / 1000).toFixed(0)}{" "}
                                        kbs
                                      </>
                                    )}
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <form onSubmit={handleUpdateProductSubmit}>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="title"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              title
                            </label>
                            <input
                              type="text"
                              placeholder="Norda OLED TV 43 Inch"
                              name="title"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  title: e.target.value,
                                })
                              }
                              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                            />
                          </div>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="description"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              Description *
                            </label>
                            <textarea
                              type="text"
                              placeholder="Norda's first brand new Tv Set on the market for sale"
                              name="description"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  description: e.target.value,
                                })
                              }
                              className="border border-[#e8e8e8] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full h-[150px]"
                            ></textarea>
                          </div>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="price"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              price
                            </label>
                            <input
                              type="number"
                              placeholder="$ 590.30"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  price: e.target.value,
                                })
                              }
                              name="price"
                              step={0.01}
                              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                            />
                          </div>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="countInStock"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              count In Stock
                            </label>
                            <input
                              type="number"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  countInStock: e.target.value,
                                })
                              }
                              placeholder="12"
                              name="countInStock"
                              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                            />
                          </div>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="category"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              category
                            </label>
                            <input
                              type="text"
                              placeholder="Electronics"
                              name="category"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  category: e.target.value,
                                })
                              }
                              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                            />
                          </div>
                          <div className="mb-[20px]">
                            <label
                              htmlFor="brand"
                              className="text-[14px] capitalize block mb-[5px]"
                            >
                              Brand
                            </label>
                            <input
                              type="text"
                              placeholder="Apple"
                              name="brand"
                              onChange={(e) =>
                                setUpdateProductForm({
                                  ...updateProductForm,
                                  brand: e.target.value,
                                })
                              }
                              className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                            />
                          </div>
                          <button
                            className="py-[10px] px-[25px] inline-block bg-primary_clr text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
                            type="submit"
                          >
                            Update Product
                          </button>
                        </form>
                      </div>
                    }
                  />
                </Routes>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAProduct;
