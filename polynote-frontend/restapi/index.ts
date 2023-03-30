import Axios from "axios";
import {
  AuthUserDto,
  CreateNoteDto,
  CreatePolybaseUserDto,
  PushNotificationDto,
  UpdateNoteDto,
  UpdatePolybaseUserNameDto,
} from "restapi/types";
import { getToken } from "utils/getToken";
import { AITextDto } from "./types";

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

export const apiDeleteNote = (id: string) => {
  return axios.delete(`/notes/${id}`);
};

export const apiGetSharedNote = (
  id: string,
  data: { address: string; signature: string }
) => {
  return axios.post(`/notes/shared/${id}`, data);
};

export const apiOptInNotifications = (data: PushNotificationDto) => {
  return axios.post(`/user/notifications/opt-in`, data);
};

export const apiOptOutNotificationsO = (data: PushNotificationDto) => {
  return axios.post(`/user/notifications/opt-out`, data);
};

export const apiUploadFile = (data: FormData) => {
  return axios.post(`/upload`, data);
};

export const apiAISummarize = (data: string) => {
  return axios.get(`/ai/summarize/${data}`);
};

export const apiAIMakeLonger = (data: AITextDto) => {
  return axios.get(`/ai/make-longer/${data}`);
};

export const apiAIFixGrammer = (data: string) => {
  return axios.get(`/ai/fix-grammer/${data}`);
};

export const POLYBASE_USER_QUERY = ["polybase_user"];
export const NOTES_QUERY = ["notes"];
export const NOTIFICATIONS = ["notifications"];
