import { AES, enc } from "crypto-js";
import { jwtDecode } from "jwt-decode";

export class TokenUtil {
  static encryptToken(token: string, secret: string) {
    return AES.encrypt(token, secret).toString();
  }

  static decryptToken(encryptedToken: string, secret: string) {
    try {
      return AES.decrypt(encryptedToken, secret).toString(enc.Utf8);
    } catch (error) {
      return undefined;
    }
  }

  static loadToken(key: string, token: string, secret: string) {
    const details: any = jwtDecode(token);
    if (key && details) {
      const encryptedToken = TokenUtil.encryptToken(token, secret);
      window.localStorage.setItem(key, encryptedToken);
    }
    return details;
  }

  static decodeToken(token: string) {
    const details: any = jwtDecode(token);
    return details;
  }

  static storeToken(key: string, token: string) {
    if (key) {
      window.localStorage.setItem(key, token);
    }
  }

  static removeToken(key: string) {
    if (key) {
      window.localStorage.removeItem(key);
    }
  }
}
