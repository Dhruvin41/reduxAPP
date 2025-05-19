// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  tokenData: null,
  userBalance: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    setUserBalance: (state, action) => {
      state.userBalance = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.tokenData = null;
      state.userBalance = null;
    },
  },
});

export const { setUserData, setTokenData, setUserBalance, clearUserData } =
  userSlice.actions;

export default userSlice.reducer;






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromAPI } from "../utils/api";
import { showToast } from "../utils/ToastManager";

export const authLogin = createAsyncThunk("loginApi", async (data) => {
  try {
    // const res = await fetchDataFromAPI(`users/login`, "POST", data, "");
  const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}` // if token is available
};
    const res = await axios.post("api/url", data ,{headers}); 
    console.log("res",res)
    
  

    showToast(res.message);
    return res;
  } catch (error) {
    showToast(error.response.data.message);


    throw error.response.data; // Rethrow the error if needed
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    users: null,
    isLoader: false,
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.isLoader = true;
      state.error = null;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoader = false;
      state.users = action.payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default loginSlice.reducer;




// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loginReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
  },
});

export default store;






  // // get home response
  const { data, isLoader, isError, error } = useSelector(
    (state) => state?.users
  );


  dispatch(authLogin());






