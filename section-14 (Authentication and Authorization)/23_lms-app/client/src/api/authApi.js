import axiosInstance from "./axiosInstance";

export const register = async (userData) => {
  const { data } = await axiosInstance.post("auth/register", userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await axiosInstance.post("auth/login", userData);
  return data;
};

export const getProfileInfo = async () => {
  const { data } = await axiosInstance.get("auth/profile");
  return data;
};
