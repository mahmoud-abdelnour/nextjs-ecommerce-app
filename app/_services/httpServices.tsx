import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
let authToken: string | null = null;
export const setToken = (token: any) => {
     authToken = token;
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};


instance.interceptors.request.use((config) => {
  if (authToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});


const responseBody = (response: AxiosResponse) => response.data;



const requests = {
  get: (url: string, body?: AxiosRequestConfig<any> | {}) => instance.get(url, body).then(responseBody),
  post: (url: string, body?: any, headers?: AxiosRequestConfig<any> | {}) => instance.post(url, body, headers).then(responseBody),
  put: (url: string, body?: any) => instance.put(url, body).then(responseBody),
};

export default requests;
