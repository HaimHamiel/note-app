import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      if (!user) {
        throw new Error("Failed to get user");
      }
      const response = await authService.register(user);
      if (!response?.token) {
        throw new Error("Failed to get token");
      }
      // Store token in localstorage
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    if (!user) {
      throw new Error("Failed to get user");
    }
    const response = await authService.login(user);
    if (!response?.token) {
      throw new Error("Failed to get token");
    }
    // Store token in localstorage
    localStorage.setItem("token", response.token);
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Get user info
export const getUser = createAsyncThunk("auth/get", async (_, thunkAPI) => {
  try {
    const token = user?.token;
    if (!token) {
      throw new Error("Failed to get token");
    }
    return await authService.getUser(token);
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(register.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        isError: false,
      }))
      .addCase(register.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null,
        isError: true,
        message: action.payload,
      }))
      .addCase(login.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        isError: false,
      }))
      .addCase(login.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null,
        isError: true,
        message: action.payload,
      }))
      .addCase(logout.fulfilled, (state) => ({
        ...state,
        user: null,
      }))
      .addCase(getUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getUser.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        isError: false,
      }))
      .addCase(getUser.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        user: null,
        isError: true,
        message: action.payload,
      }));
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
