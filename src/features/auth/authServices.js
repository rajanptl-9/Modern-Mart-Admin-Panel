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

const authServices = {
  login,
};

export default authServices;