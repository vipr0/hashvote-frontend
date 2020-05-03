import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("jwt");
};

export const setAuthToken = (value) => {
  return Cookies.set("jwt", value);
};

export const removeAuthToken = () => {
  return Cookies.remove("jwt");
};
