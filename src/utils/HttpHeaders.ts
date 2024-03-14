import { CONTENT_TYPES } from "./Constants";

export function getAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getContentTypeUrlEncoded() {
  return {
    "Content-Type": CONTENT_TYPES.FORM_URLENCODED,
  };
}

export function getContentTypeJson() {
  return {
    "Content-Type": CONTENT_TYPES.JSON,
  };
}
