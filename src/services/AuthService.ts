import store from "../store";
import ApiService from "./ApiService";
import {
  ChangePasswordPayload,
  EditUserPayload,
  OAuthPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../payload/AuthPayload";
import {
  setAccessToken,
  setIsAuthenticated,
  setRefreshToken,
  setUser,
} from "../store/authSlice";
import { API_ROUTES } from "../utils/Constants";
import { getContentTypeUrlEncoded } from "../utils/HttpHeaders";

class AuthService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async register(payload: RegisterPayload) {
    try {
      return await this.apiService.post(API_ROUTES.USER, payload);
    } catch (error: any) {
      if (error.responseBody.Data.DuplicateUserName) {
        throw new Error("User already taken");
      } else {
        throw new Error(
          error.responseBody?.Message || "Unknown error occurred",
        );
      }
    }
  }

  async editUser(token: string, payload: EditUserPayload) {
    return this.apiService.put(API_ROUTES.USER, payload, {
      headers: getContentTypeUrlEncoded(),
    });
  }

  async changePassword(token: string, payload: ChangePasswordPayload) {
    return this.apiService.put(API_ROUTES.USER_PASSWORD, payload, {
      headers: getContentTypeUrlEncoded(),
    });
  }

  async resetPassword(payload: ResetPasswordPayload) {
    return this.apiService.put(API_ROUTES.USER_RESET_PASSWORD, payload);
  }

  async login(payload: OAuthPayload) {
    const formData = new URLSearchParams();
    formData.append("UserName", payload.email);
    formData.append("Password", payload.password);
    formData.append("grant_type", "password");

    const response = await this.apiService.post(
      API_ROUTES.OAUTH_TOKEN,
      formData.toString(),
      {
        headers: getContentTypeUrlEncoded(),
      },
    );

    if (response.access_token) {
      store.dispatch(setUser(response.user_name));
      store.dispatch(setAccessToken(response.access_token));
      store.dispatch(setRefreshToken(response.refresh_token));
      store.dispatch(setIsAuthenticated(true));
    }

    return response;
  }

  async refreshToken(refreshToken: string) {
    const formData = new URLSearchParams();
    formData.append("refresh_token", refreshToken);
    formData.append("grant_type", "refresh_token");

    return await this.apiService.post(
      API_ROUTES.OAUTH_TOKEN,
      formData.toString(),
      {
        headers: getContentTypeUrlEncoded(),
      },
    );
  }
}

const apiService = new ApiService("https://api.phoenixhub.app");
const authService = new AuthService(apiService);
export default authService;
