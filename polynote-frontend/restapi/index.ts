import Axios from "axios";
import {
  CreatePolybaseUserDto,
  UpdatePolybaseUserNameDto,
} from "restapi/types";

const apiURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const axios = Axios.create({
  baseURL: apiURL,
});

export const apiGetPolybaseUser = (address: string) => {
  return axios.get(`/user/${address}`);
};

export const apiUpdatePolybaseUserName = (
  address: string,
  data: UpdatePolybaseUserNameDto
) => {
  return axios.post(`/user/${address}`, data);
};

export const apiCreatePolybaseUser = (data: CreatePolybaseUserDto) => {
  return axios.post(`/user`, data);
};

export const POLYBASE_USER_QUERY = ["polybase_user"];
export const POLYBASE_CREATE_USER_MUTATION = ["polybase_create_user"];
