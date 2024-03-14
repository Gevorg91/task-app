import { useNavigate } from "react-router-dom";
import authService from "../services/AuthService";
import { RootState } from "../store/rootReducer";
import { useSelector } from "react-redux";
import { RegisterPayload } from "../payload/AuthPayload";

export function useAuth() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response.access_token) {
        return true;
      }
    } catch (error) {
      return false;
      console.error("Login error:", error);
    }
  };

  const register = async (payload: RegisterPayload) => {
    if (payload.password !== payload.passwordConfirm) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await authService.register(payload);
      console.log("Registration successful:", response);
      await login(payload.email, payload.password);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return { isAuthenticated, login, register };
}
