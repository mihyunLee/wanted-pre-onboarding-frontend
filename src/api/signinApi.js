import { instance } from "./axiosInstance";

export const postSignin = async (data) => {
  const response = await instance.post(`/auth/signin`, data);
  return response.data;
};
