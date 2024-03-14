export interface RegisterPayload {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface EditUserPayload {
  phoneNumber: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  deviceId: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

export interface ResetPasswordPayload {
  email: string;
  token: string;
  newPassword: string;
  passwordConfirm: string;
  deviceId: string;
}

export interface OAuthPayload {
  email: string;
  password: string;
  refreshToken?: string;
}
