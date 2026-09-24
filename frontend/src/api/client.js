import axios from "axios";
import { tokenStorage } from "../auth/tokenStorage.js";

let unauthorizedHandler = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//-----------------
//-----Interceptors
//-----------------

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);

//------------------
//-----Unauthorized
//-----------------

export function onUnauthorized(handler) {
  unauthorizedHandler = handler;
}

export default api;
