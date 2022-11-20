import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";

import { BreadCrumbNav, LoaderAnim } from "../components";
import {
  productsStateReset,
  createAProductAction,
} from "../redux/slices/ProductsSlice";

const CreateAProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productsPending, newCreated } = useSelector(
    (state) => state.products
  );
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [ratingValue, setRatingValue] = useState(3.5);

  const [image, setImage] = useState([]);

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

  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    price: "",
    countInStock: "",
    rating: ratingValue,
    brand: "",
    category: "",
  });

  const handleProductChange = (e) => {
    setProductFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const { title, price, countInStock, description, brand, category, rating } =
      productFormData;

    if (image.length <= 0) {
      addToast("Choose an Inage for your product", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (title === "") {
      addToast("A Product must have a title", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    } else if (title.length < 10) {
      addToast("Choose a more sensible title", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (description === "") {
      addToast("Provide a better understanding to your customers", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    } else if (description.length < 50) {
      addToast("A minimum of 50 chars is required", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (price === "") {
      addToast("What's the cost of ya Product?", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (countInStock === "") {
      addToast("What's the quantity of em Products?", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (category === "") {
      addToast("Choose a Category for your Product", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (brand === "") {
      addToast("Choose a Brand for your Product", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    let formValues = new FormData();
    formValues.append("product", image[0].data);
    formValues.append("title", title);
    formValues.append("description", description);
    formValues.append("price", price);
    formValues.append("rating", rating);
    formValues.append("countInStock", countInStock);
    formValues.append("brand", brand);
    formValues.append("category", category);

    dispatch(createAProductAction(formValues));
    setImage([]);
  };

  useEffect(() => {
    dispatch(productsStateReset());
    if (user) {
      if (!user.isAdmin) {
        navigate("/products");
      }
    }
    if (newCreated) {
      addToast("A new Product has been created.", {
        appearance: "success",
        autoDismiss: true,
      });
      window.scrollTo(0, 0);
    }
  }, [dispatch, addToast, user, navigate, newCreated]);

  return (
    <>
      <BreadCrumbNav location={"Create Product"} />
      {productsPending ? (
        <>
          <LoaderAnim />
        </>
      ) : (
        <div className="p-5 sm:p-[80px]">
          <div className="mt-8 mx-auto w-full md:w-3/4">
            <div className="account_tab">
              <h1 className="account_heading">Create A New Product</h1>
              <p className="bg-white border-t-[3px] border-primary_clr text-[13px] py-[20px] px-0 text-[#333] font-semibold">
                All fields are required!
              </p>
              <div className="DROPZONE">
                <div
                  {...getRootProps({
                    className: `dropzone rounded-[4px] ${
                      isDragAccept && "dropZoneAccept"
                    } ${isDragReject && "dropZoneReject"}`,
                  })}
                >
                  <input className="input-zone" {...getInputProps()} />
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
                            <>{(image[0].data.size / 1000000).toFixed(1)} mbs</>
                          ) : (
                            <>{(image[0].data.size / 1000).toFixed(0)} kbs</>
                          )}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <form
                onChange={handleProductChange}
                onSubmit={handleProductSubmit}
              >
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
                    placeholder="12"
                    name="countInStock"
                    className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                  />
                </div>
                <div className="border border-[#e2e2e2] my-3 py-2 rounded-[3px] flex items-center flex-col sm:flex-row  justify-between sm:justify-evenly">
                  <h2>Product Rating</h2>
                  <div className="flex items-center">
                    <Rating
                      precision={0.1}
                      size="large"
                      value={Number(ratingValue)}
                      onChange={(e, newvalue) => {
                        setProductFormData((prev) => ({
                          ...prev,
                          rating: newvalue,
                        }));
                        setRatingValue(newvalue);
                      }}
                    />
                    <span className="ml-2 text-[14px] font-semibold">
                      {ratingValue}
                    </span>
                  </div>
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
                    className="border border-[#e8e8e8] h-[50px] bg-transparent py-[2px] px-[10px] text-[#1f2226] text-[13px] focus:border-[#343538] mx-auto w-full"
                  />
                </div>
                <button
                  className="py-[10px] px-[25px] inline-block bg-primary_clr text-white text-sm font-bold transition-all uppercase hover:bg-black rounded-[25px] mt-3"
                  type="submit"
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAProduct;
