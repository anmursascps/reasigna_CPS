import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "auth/";

const register = (request) => {
  return axios.post(API_URL + "signup", request, { headers: authHeader() });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  sessionStorage.removeItem("user");
};
const getCurrentUser = () => {
  var user = "";
  try {
    user = JSON.parse(sessionStorage.getItem("user"));
  } catch (error) {}
  return user;
};

const isAdmin = () => {
  return axios.get(API_URL + "validate", { headers: authHeader() });
};

const updateUser = (id, user) => {
  console.log(user);
  return axios.put(API_URL + "edit/" + id, user, { headers: authHeader() });
};

const change_password = (user) => {
  return axios.put(API_URL + "editpassword", user, { headers: authHeader() });
};

const resetPassword = (user) => {
  return axios.put(API_URL + "resetpassword", user, { headers: authHeader() });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAdmin,
  updateUser,
  change_password,
  resetPassword,
};
export default AuthService;
