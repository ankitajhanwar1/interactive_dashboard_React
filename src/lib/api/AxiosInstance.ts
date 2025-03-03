import axios from "axios";
import { BASE_URL } from "../../constants";

export const api = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "x-api-key": "abc",
  // },
});

export const buildQueryString = ( params: Record<string, string | number | undefined> |undefined): string => {
  const queryString = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value.toString());
      }
    });
  }
  return queryString.toString();
};
