import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Link, useLocation, Routes, Route } from "react-router-dom";

import {
  SignInAUserAction,
  authStateReset,
  SignUpAUserAction,
} from "../redux/slices/AuthSlice";
import { BreadCrumbNav, LoaderAnim } from "../components";

function SigninUser() {
  const dispatch = useDispatch();
  const { user, authFailed, authMessage } = useSelector((state) => state.auth);
  const { addToast } = useToasts();
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(authStateReset());

    if (authFailed) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
  }, [dispatch, addToast, authFailed, user, authMessage]);

  const handleSigninSubmit = (e) => {
    e.preventDefault();

    if (signInFormData.email === "") {
      addToast("Please Provide your email Address", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (signInFormData.password === "") {
      addToast("Please Provide your Passsword", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    } else if (signInFormData.password.length < 6) {
      addToast("Choose a more strong Passsword!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    dispatch(SignInAUserAction(signInFormData));
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSigninSubmit}>
      <div>
        <label
          htmlFor="loginEmail"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Email Address
        </label>
        <input
          autoFocus
          className="border border-[#ebebeb] text-[14px] mb-[30px] py-3 px-[15px] text-[#010225] focus:border-[#343538] w-full"
          type="email"
          name="email"
          onChange={(e) =>
            setSignInFormData({ ...signInFormData, email: e.target.value })
          }
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="loginPassword"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Password
        </label>
      </div>
      <input
        className="border border-[#ebebeb] text-[14px] mb-[30px] py-3 px-[15px] text-[#010225] focus:border-[#343538] w-full"
        type="password"
        name="password"
        placeholder="******"
        onChange={(e) =>
          setSignInFormData({ ...signInFormData, password: e.target.value })
        }
      />
      <div className="button-box">
        <div className="pt-[10px] px-0 pb-[19px]">
          <p>
            <Link to="/" className="hover:text-primary_clr transition-all">
              Forgot Password?
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary_clr font-semibold text-[14px] leading-[1] py-[13px] px-[30px] transition-all hover:bg-[#010225] text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
}

function SignupUser() {
  const dispatch = useDispatch();
  const { user, authFailed, authMessage } = useSelector((state) => state.auth);
  const { addToast } = useToasts();
  const [signupFormData, setSignupFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(authStateReset());

    if (authFailed) {
      addToast(authMessage, { appearance: "error", autoDismiss: true });
    }
  }, [dispatch, addToast, user, authFailed, authMessage]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupFormData.fullname === "") {
      addToast("You must provide your name please!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    } else if (signupFormData.fullname.length < 7) {
      addToast("Your fullname is required!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (signupFormData.email === "") {
      addToast("Please Provide your email Address", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (signupFormData.password === "") {
      addToast("Please Provide your Passsword", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    } else if (signupFormData.password.length < 6) {
      addToast("Choose a more strong Passsword!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    dispatch(SignUpAUserAction(signupFormData));
  };

  return (
    <form className="flex flex-col" onSubmit={handleSignupSubmit}>
      <div>
        <label
          htmlFor="fullname"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Full Name
        </label>
        <input
          className="border border-[#ebebeb] text-[14px] mb-[30px] py-3 px-[15px] text-[#010225] focus:border-[#343538] w-full"
          type="text"
          name="fullname"
          autoFocus
          placeholder="John Doe"
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, fullname: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Email Address
        </label>
        <input
          className="border border-[#ebebeb] text-[14px] mb-[30px] py-3 px-[15px] text-[#010225] focus:border-[#343538] w-full"
          type="text"
          name="email"
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, email: e.target.value })
          }
          placeholder="John@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-[14px] capitalize block mb-[5px]"
        >
          Password
        </label>
        <input
          className="border border-[#ebebeb] text-[14px] mb-[30px] py-3 px-[15px] text-[#010225] focus:border-[#343538] w-full"
          type="text"
          name="password"
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, password: e.target.value })
          }
          placeholder="********"
        />
      </div>
      <div>
        <div className="pt-[10px] px-0 pb-[19px]">
          <p>
            <Link
              to="/privacy-policy"
              className="hover:text-primary_clr transition-all"
            >
              View full End User Agreement and the Privacy policy!
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="bg-primary_clr font-semibold text-[14px] leading-[1] py-[13px] px-[30px] transition-all hover:bg-[#010225] text-white"
        >
          Register
        </button>
      </div>
    </form>
  );
}

const Auth = () => {
  const { authPending } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  return (
    <>
      <BreadCrumbNav location={"Login | Register"} />

      <div className="pb-[30px] p-5 md:py-10 md:px-[50px] lg:px-[100px]">
        <div className="flex justify-center mb-5 md:mb-16">
          <Link to={"/auth/signin"} className="relative auth_nav">
            <h4
              className={`${
                pathname === `/auth/signin` ? `text-primary_clr` : ""
              } text-[25px] hover:text-primary_clr font-bold my-0 mx-5 capitalize transition-all`}
            >
              login
            </h4>
          </Link>
          <Link to={"/auth/signup"} className="relative before:hidden auth_nav">
            <h4
              className={`${
                pathname === `/auth/signup` ? `text-primary_clr` : ""
              } text-[25px] hover:text-primary_clr font-bold my-0 mx-5 capitalize transition-all`}
            >
              register
            </h4>
          </Link>
        </div>
        {authPending ? (
          <>
            <LoaderAnim />
          </>
        ) : (
          <div className="auth_form border border-b-0 shadow-xl rounded-[8px] py-[40px] md:py-[80px] px-[15px] md:px-[50px] lg:p-[80px] w-full md:w-[58%] mx-auto">
            <Routes>
              <Route path="/signin" element={<SigninUser />} />
              <Route path="/signup" element={<SignupUser />} />
            </Routes>
          </div>
        )}
      </div>
      <style>{`
        .auth_nav::before {
          background-color: #454545;
          bottom: 5px;
          content: "";
          height: 24px;
          margin: 0 auto;
          position: absolute;
          right: -2px;
          -webkit-transition: all 0.4s ease 0s;
          -o-transition: all 0.4s ease 0s;
          transition: all 0.4s ease 0s;
          width: 1px;
        }
      `}</style>
    </>
  );
};

export default Auth;
