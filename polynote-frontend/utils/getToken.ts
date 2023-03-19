import { ACCESS_TOKEN_KEY } from "consts/storage";

export const getToken = () => {
  return `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
};
