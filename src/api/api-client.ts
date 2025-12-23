import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import jsCookie from "js-cookie";

type AuthData = {
  accessToken: string;
  refreshToken: string;
};

type Subscriber = (token: string | null) => void;

export class ApiClient {
  baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  private api: AxiosInstance;
  private isRefreshing = false;
  private subscribers: Subscriber[] = [];

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  /* ---------------- cookie helpers ---------------- */
  public getAuthData = (): AuthData | null => {
    try {
      const raw = jsCookie.get("authData");
      if (!raw) return null;
      return JSON.parse(raw) as AuthData;
    } catch {
      return null;
    }
  };

  public setAuthData = (newAccessToken: string): void => {
    const currentData = this.getAuthData();
    if (currentData) {
      const updated: AuthData = { ...currentData, accessToken: newAccessToken };
      jsCookie.set("authData", JSON.stringify(updated), { expires: 1 / 24 });
    } else {
      jsCookie.remove("authData");
    }
  };

  /* ---------------- interceptors ---------------- */
  private setupInterceptors = () => {
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const authData = this.getAuthData();
        if (authData?.accessToken) {
          config.headers.Authorization = `Bearer ${authData.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this.handleResponseError(error)
    );
  };

  private handleResponseError = async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // don't try refresh if the request is login
    if (originalRequest.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (this.isRefreshing) {
        return new Promise((resolve) => {
          this.subscribers.push((newToken) => {
            if (newToken && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(this.api(originalRequest));
          });
        });
      }

      this.isRefreshing = true;

      try {
        const newToken = await this.refreshToken();
        this.isRefreshing = false;

        this.subscribers.forEach((cb) => cb(newToken));
        this.subscribers = [];

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return this.api(originalRequest);
      } catch (refreshErr) {
        this.isRefreshing = false;
        this.subscribers.forEach((cb) => cb(null));
        this.subscribers = [];

        jsCookie.remove("authData");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  };

  /* ---------------- token refresh ---------------- */
  public refreshToken = async (): Promise<string> => {
    const refreshClient = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    const res = await refreshClient.post<{ accessToken: string }>(`${this.baseURL}/auth/refresh-tokens`);
    const newAccessToken = res.data.accessToken;
    this.setAuthData(newAccessToken);
    return newAccessToken;
  };

  /* ---------------- public axios instance ---------------- */
  get instance(): AxiosInstance {
    return this.api;
  }
}
