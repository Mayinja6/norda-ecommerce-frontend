import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reduxFuncs from "../reduxFuncs";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  authSuccess: false,
  authPending: false,
  authFailed: false,
  authMessage: "",
};

// Create A User
export const SignUpAUserAction = createAsyncThunk(
  "auth/signup",
  async (signupData, thunkAPI) => {
    try {
      return await reduxFuncs.signUpAUserCli(signupData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// USer Login
export const SignInAUserAction = createAsyncThunk(
  "auth/signin",
  async (signinData, thunkAPI) => {
    try {
      return await reduxFuncs.SignInAUserCli(signinData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// User Logout
export const signOutAUserAction = createAsyncThunk("auth/signout", () => {
  return reduxFuncs.signOutAUserCli();
});

// Update A User
export const updateAUserAction = createAsyncThunk(
  "auth/update",
  async (updateData, thunkAPI) => {
    try {
      return await reduxFuncs.updateAUserCli(updateData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// Delete A User
export const deleteAUserAction = createAsyncThunk("auth/delete", async () => {
  return await reduxFuncs.deleteAUserCli();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateReset: (state) => {
      state.authFailed = false;
      state.authSuccess = false;
      state.authMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUpAUserAction.pending, (state) => {
        state.authPending = true;
      })
      .addCase(SignUpAUserAction.rejected, (state, action) => {
        state.authPending = false;
        state.authFailed = true;
        state.authMessage = action.payload || action.error.message;
      })
      .addCase(SignUpAUserAction.fulfilled, (state, action) => {
        state.authPending = false;
        state.authSuccess = true;
        state.user = action.payload;
      })

      .addCase(SignInAUserAction.pending, (state) => {
        state.authPending = true;
      })
      .addCase(SignInAUserAction.rejected, (state, action) => {
        state.authPending = false;
        state.authFailed = true;
        state.authMessage = action.payload || action.error.message;
      })
      .addCase(SignInAUserAction.fulfilled, (state, action) => {
        state.authPending = false;
        state.authSuccess = true;
        state.user = action.payload;
      })

      .addCase(signOutAUserAction.pending, (state) => {
        state.authPending = true;
      })
      .addCase(signOutAUserAction.fulfilled, () => {
        window.location.assign("/");
      })

      .addCase(updateAUserAction.pending, (state) => {
        state.authPending = true;
      })
      .addCase(updateAUserAction.rejected, (state, action) => {
        state.authPending = false;
        state.authFailed = true;
        state.authMessage = action.payload || action.error.message;
      })
      .addCase(updateAUserAction.fulfilled, (state, action) => {
        state.authPending = false;
        state.user = action.payload;
        state.authSuccess = true;
      })

      .addCase(deleteAUserAction.pending, (state) => {
        state.authPending = true;
      })
      .addCase(deleteAUserAction.rejected, (state, action) => {
        state.authFailed = true;
        state.authPending = false;
        state.authMessage = action.payload || action.error.message;
      })
      .addCase(deleteAUserAction.fulfilled, (state) => {
        state.authPending = false;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { authStateReset } = authSlice.actions;
export default authSlice.reducer;
