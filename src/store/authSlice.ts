import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/userModel";
import { STORAGE_TYPES } from "../utils/Constants";

interface AuthState {
  userName: string | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  userName: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      localStorage.setItem(STORAGE_TYPES.USER_NAME, action.payload);
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem(STORAGE_TYPES.ACCESS_TOKEN, action.payload);
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      localStorage.setItem(STORAGE_TYPES.REFRESH_TOKEN, action.payload);
    },
    logout(state) {
      state.userName = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem(STORAGE_TYPES.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_TYPES.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_TYPES.USER_NAME);
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setIsAuthenticated,
  setRefreshToken,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
