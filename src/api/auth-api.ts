import { ApiClient } from "./api-client";

type AuthData = {
  accessToken: string;
  refreshToken: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

class AuthApiClient {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async login(data: LoginPayload): Promise<AuthData> {
    const res = await this.apiClient.instance.post<AuthData>(`/auth/login`, data);
    this.apiClient.setAuthData(res.data.accessToken);
    return res.data;
  }

  async getMe() {
    const res = await this.apiClient.instance.get(`/auth/me`);
    return res.data;
  }

  async logout(): Promise<void> {
    await this.apiClient.instance.post("/auth/logout");
    this.apiClient.setAuthData(null as any);
  }

  async refreshToken(): Promise<string> {
    const accessToken = await this.apiClient.refreshToken();
    this.apiClient.setAuthData(accessToken);
    return accessToken;
  }
}

export const authApi = new AuthApiClient();
