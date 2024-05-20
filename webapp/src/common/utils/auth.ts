import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";

export const encryptToken = (token: string, secret: string) => {
  return AES.encrypt(token, secret).toString();
};

export const decryptToken = (encryptedToken: string, secret: string) => {
  try {
    return AES.decrypt(encryptedToken, secret).toString(enc.Utf8);
  } catch (error) {
    return undefined;
  }
};

export const loadToken = (key: string, token: string, secret: string) => {
  const details: any = jwtDecode(token);
  if (key && details) {
    const encryptedToken = encryptToken(token, secret);
    window.localStorage.setItem(key, encryptedToken);
  }
  return details;
};

export const decodeToken = (token: string) => {
  const details: any = jwtDecode(token);
  return details;
};

export const storeToken = (key: string, token: string) => {
  if (key) {
    window.localStorage.setItem(key, token);
  }
};
