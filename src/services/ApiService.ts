import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { logout } from "../store/authSlice";
import { CONTENT_TYPES, STORAGE_TYPES } from "../utils/Constants";

interface RefreshTokenResponse {
  userId: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user_name: string;
  token_type: string;
  email_confirmed: boolean;
}

class ApiService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": CONTENT_TYPES.JSON,
      },
    });

    this.initializeResponseInterceptor();
  }

  public async get(path: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(path, config);
  }

  public async post(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    return this.instance.post(path, data, config);
  }

  public async put(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    return this.instance.put(path, data, config);
  }

  public async delete(path: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(path, config);
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this.handleResponse,
      async (error) => this.handleErrorResponse(error),
    );
  }

  private handleResponse(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  }

  private async handleErrorResponse(error: any) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const userName = localStorage.getItem("UserName");
        if (!refreshToken || !userName)
          throw new Error("No refresh token or user name available.");

        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("UserName", userName);

        const response: RefreshTokenResponse = await this.instance.post(
          "/OAuth/token",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );

        localStorage.setItem(STORAGE_TYPES.ACCESS_TOKEN, response.access_token);
        localStorage.setItem(
          STORAGE_TYPES.REFRESH_TOKEN,
          response.refresh_token,
        );
        originalRequest.headers["Authorization"] =
          `Bearer ${response.access_token}`;
        return this.instance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
}

export default ApiService;
