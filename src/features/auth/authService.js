import axiosInstance from "../../config/axios";

const API_URL = "/api/users/";

//Register user
const register = async (userData) => {
  let result = null;
  try {
    const response = await axiosInstance.post(API_URL, userData);

    if (!response?.data) {
      throw new Error("Failed to register");
    }
    localStorage.setItem("user", JSON.stringify(response.data));
    result = response.data;
  } catch (error) {
    throw error;
  }
  return result;
};

//Login user
const login = async (userData) => {
  let result = null;
  try {
    const response = await axiosInstance.post(API_URL + "login", userData);
    if (!response?.data) {
      throw new Error("Failed to login");
    }
    localStorage.setItem("user", JSON.stringify(response.data));
    result = response.data;
  } catch (error) {
    throw error;
  }
  return result;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Get user data
const getUser = async () => {
  let result = null;
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      throw new Error("Failed to get user token");
    }
    const token = user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.get(API_URL + "me", config);
    result = response.data;
  } catch (error) {
    throw error;
  }
  return result;
};

const authService = {
  register,
  logout,
  login,
  getUser,
};

export default authService;