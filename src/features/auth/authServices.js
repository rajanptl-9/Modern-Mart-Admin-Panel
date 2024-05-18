import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login-admin`, userData);
  const user = JSON.stringify(response.data);
  if (response.data) {
    localStorage.setItem("user", user);
  }
  return response.data;
}

const forgotPassword = async (email) => {
  const response = await axios.post(`${base_url}user/forgot-password-token`, email);
  return response.data;
}

const resetPassword = async (data) => {
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`, data);
  return response.data;
}

const authServices = {
  login,
  forgotPassword,
  resetPassword,
};

export default authServices;