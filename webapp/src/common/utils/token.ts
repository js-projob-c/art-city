import { jwtDecode } from "jwt-decode";

import { ACCESS_TOKEN_KEY } from "../constants/variables";
import { EncryptionUtil } from "./encryption";

export class TokenUtil {
  static getTokenDetails<TokenDetails>(
    token: string
  ): TokenDetails | undefined {
    // const token = TokenUtil.getToken();
    if (!token) return undefined;
    const details: any = jwtDecode(token);
    return details;
  }

  static decodeToken(token: string) {
    if (!token) return undefined;
    const details: any = jwtDecode(token);
    return details;
  }

  // static getToken(): string | undefined {
  //   const encryptedToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  //   return encryptedToken ? EncryptionUtil.decrypt(encryptedToken) : undefined;
  // }

  // static storeToken(token: string) {
  //   const encryptedToken = EncryptionUtil.encrypt(token);
  //   window.localStorage.setItem(ACCESS_TOKEN_KEY, encryptedToken);
  // }

  // static removeToken() {
  //   window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  // }
}
