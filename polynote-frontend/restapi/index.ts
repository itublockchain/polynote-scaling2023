import Axios from "axios";
import {
  AuthUserDto,
  CreateNoteDto,
  CreatePolybaseUserDto,
  UpdateNoteDto,
  UpdatePolybaseUserNameDto,
} from "restapi/types";
import { getToken } from "utils/getToken";

const apiURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const axios = Axios.create({
  baseURL: apiURL,
});

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const apiGetPolybaseUser = (address: string) => {
  return axios.get(`/user/${address}`);
};

export const apiGetNotes = (address: string) => {
  return axios.get(`/notes/${address}`);
};

export const apiUpdatePolybaseUserName = (
  address: string,
  data: UpdatePolybaseUserNameDto
) => {
  return axios.put(`/user/${address}`, data);
};

export const apiCreatePolybaseUser = (data: CreatePolybaseUserDto) => {
  return axios.post(`/user`, data);
};

export const apiAuthUser = (data: AuthUserDto) => {
  return axios.post(`/user/auth`, data);
};

export const apiCreateNote = (data: CreateNoteDto) => {
  return axios.post(`/notes`, data);
};

export const apiUpdateNote = (id: string, data: UpdateNoteDto) => {
  return axios.post(`/notes/${id}`, data);
};

export const POLYBASE_USER_QUERY = ["polybase_user"];
export const NOTES_QUERY = ["notes"];
