import Axios from "axios";

const apiURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

const axios = Axios.create({
  baseURL: apiURL,
});

export const apiGetPolybaseUser = () => {
  return axios.get("/user");
};

export const POLYBASE_USER_QUERY = ["polybase_user"];
