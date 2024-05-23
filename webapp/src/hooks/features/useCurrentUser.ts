import Cookies from "js-cookie";

import { ACCESS_TOKEN_KEY } from "@/common/constants/variables";
import { EncryptionUtil } from "@/common/utils/encryption";
import { TokenUtil } from "@/common/utils/token";

const useCurrentUser = () => {
  const encryptedToken = Cookies.get(ACCESS_TOKEN_KEY);
  const token = EncryptionUtil.decrypt(encryptedToken ?? "");
  const details = TokenUtil.getTokenDetails(token ?? "");
  return details ?? null;
};

export default useCurrentUser;
