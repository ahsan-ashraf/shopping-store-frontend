import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import jsCookie from "js-cookie";
import type { Role } from "../types";

/* ---------------- types ---------------- */

type AuthData = {
  id: string;
  name: string;
  email: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
};

type Subscriber = (token: string | null) => void;

/* ---------------- axios instance ---------------- */

const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/* ---------------- cookie helpers ---------------- */

const getAuthDataFromCookie = (): AuthData | null => {
  try {
    const raw = jsCookie.get("authData");
    if (!raw) return null;
    return JSON.parse(raw) as AuthData;
  } catch {
    return null;
  }
};

const setAuthDataToCookie = (newAccessToken: string): void => {
  const currentData = getAuthDataFromCookie();
  if (currentData) {
    const updated: AuthData = {
      ...currentData,
      accessToken: newAccessToken,
    };

    jsCookie.set("authData", JSON.stringify(updated), {
      expires: 1 / 24,
    });
  } else {
    // No current data, clear the cookie
    jsCookie.remove("authData");
  }
};

/* ---------------- request interceptor ---------------- */

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authData = getAuthDataFromCookie();

    if (authData?.accessToken) {
      config.headers.Authorization = `Bearer ${authData.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/* ---------------- refresh handling ---------------- */

let isRefreshing = false;
let subscribers: Subscriber[] = [];

const notifySubscribers = (newToken: string | null): void => {
  subscribers.forEach((cb) => cb(newToken));
  subscribers = [];
};

const addSubscriber = (cb: Subscriber): void => {
  subscribers.push(cb);
};

const performTokenRefresh = async (): Promise<string> => {
  const refreshClient = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const res = await refreshClient.post<{ accessToken: string }>("/auth/refresh-token");

  const newAccessToken = res.data.accessToken;
  setAuthDataToCookie(newAccessToken);

  return newAccessToken;
};

/* ---------------- response interceptor ---------------- */

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(API(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await performTokenRefresh();

        isRefreshing = false;
        notifySubscribers(newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return API(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        notifySubscribers(null);
        jsCookie.remove("authData");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
