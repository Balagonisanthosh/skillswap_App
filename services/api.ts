import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = __DEV__
  ? "http://192.168.1.5:3000/api"
  : "https://skill-swap-fullstack-1-8y82.onrender.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

