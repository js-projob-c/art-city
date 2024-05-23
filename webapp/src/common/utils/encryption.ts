import { AES, enc } from "crypto-js";

import { env } from "../constants/variables";

export class EncryptionUtil {
  static encrypt(data: string): string {
    return AES.encrypt(data, env.encryptTokenSecret).toString();
  }

  static decrypt(data: string): string | undefined {
    try {
      return AES.decrypt(data, env.encryptTokenSecret).toString(enc.Utf8);
    } catch (error) {
      return undefined;
    }
  }
}
