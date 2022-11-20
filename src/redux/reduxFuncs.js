import axios from "axios";

const signUpAUserCli = async (signupData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
    signupData
  );

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};
const SignInAUserCli = async (signinData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/signin`,
    signinData
  );

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const signOutAUserCli = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};

const updateAUserCli = async (updateData) => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/update`,
    updateData,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const deleteAUserCli = async () => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/api/users/delete`,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return data;
};

const fetchAllServerProductsCli = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/products`
  );

  return data;
};

const createAServerProductCli = async (productForm) => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/create`,
    productForm,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );
  return data;
};

const getAProductByIdCli = async (productId) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
  );

  return data;
};

const updateAProductByIdCli = async (updateProductForm) => {
  const authToken = JSON.parse(localStorage.getItem("user"));
  const { data } = await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/${updateProductForm.productId}`,
    updateProductForm.productData,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return data;
};

const deleteAProductByItsIdCli = async (productId) => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return data;
};

const reviewAProductCli = async (reviewInfo) => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/${reviewInfo.productId}/review`,
    reviewInfo.body,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return response.data;
};

const createAnOrderCli = async (order) => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/orders/create`,
    order,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return data;
};

const getUserOrdersCli = async () => {
  const authToken = JSON.parse(localStorage.getItem("user"));

  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/orders/mine`,
    {
      headers: {
        auth_token: authToken.token,
      },
    }
  );

  return data;
};

const reduxFuncs = {
  signUpAUserCli,
  SignInAUserCli,
  signOutAUserCli,
  updateAUserCli,
  deleteAUserCli,
  fetchAllServerProductsCli,
  createAServerProductCli,
  getAProductByIdCli,
  updateAProductByIdCli,
  deleteAProductByItsIdCli,
  reviewAProductCli,
  createAnOrderCli,
  getUserOrdersCli,
};

export default reduxFuncs;
