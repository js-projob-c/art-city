import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import { useQuery } from "@tanstack/react-query";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { randomUUID } from "crypto";
// import { addSeconds, formatISO, isPast, parseISO } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { LoginResponse } from "@/common/constants/types";

import { MAX_COOKIES_DAY } from "../common/constants/variables";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const ACCESS_TOKEN = "access-token";
const TOKEN_EXPIRATION = "token-expiration";
export const COGNITO_GROUP = "cognito-group";
const SESSION_ID = "session-id";

export const ADMIN_DEFAULT_DOMAIN = "https://admin.dev.markato.cloud";
export type AccessToken = {
  sub: string;
  "cognito:groups": string[];
  username: string;
  profile: string;
  preferred_username: string;
};

const headers = {
  accept: "application/json",
  "Content-type": "application/json",
  "x-locale": Cookies.get("NEXT_LOCALE") ?? "en-hk",
};

const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers,
});

export const setSessionId = () =>
  sessionStorage.setItem(SESSION_ID, randomUUID());
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_ID);
  if (!sessionId) {
    sessionId = randomUUID();
    sessionStorage.setItem(SESSION_ID, sessionId);
  }
  return sessionId;
};
export function getCookie(key: string) {
  return Cookies.get(key) ?? "";
}

export const getAccessToken = () => {
  const cookieImpersonate = getCookie("impersonated-token");

  if (cookieImpersonate && cookieImpersonate !== "") {
    return cookieImpersonate;
  }
  return localStorage.getItem(ACCESS_TOKEN);
};
const getTokenExpirationTime = () => {
  const result = Cookies.get(TOKEN_EXPIRATION);
  if (!result) {
    const newExiprationDate = new Date().toISOString();
    Cookies.set(TOKEN_EXPIRATION, newExiprationDate, {
      expires: MAX_COOKIES_DAY,
    });
    return newExiprationDate;
  }
  return result;
};

export const getTokenCognitoGroup = (accessToken: string) => {
  const decodedToken: AccessToken = jwtDecode(accessToken);
  return decodedToken["cognito:groups"].join(",");
};

export const setAccessToken = (accessToken: string, expiresIn: number) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  Cookies.set(
    TOKEN_EXPIRATION,
    DatetimeUtil.moment()
      .add(expiresIn - 20, "second")
      .toISOString(),
    { expires: MAX_COOKIES_DAY }
  );
  Cookies.set(COGNITO_GROUP, getTokenCognitoGroup(accessToken), {
    expires: MAX_COOKIES_DAY,
  });
  // "Refresh" request interceptor to update it with a new token
  createRequestInterceptor();
};

export const deleteAccessToken = () => {
  Cookies.remove("impersonated-token");
  Cookies.remove(TOKEN_EXPIRATION);
  Cookies.remove(COGNITO_GROUP);
  localStorage.removeItem(ACCESS_TOKEN);
  // Clear request interceptor on logout
  httpClient.interceptors.request.clear();
  createRequestInterceptor();
};

const createRequestInterceptor = () => {
  httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      config.headers.sessionId = getSessionId();
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
};

createRequestInterceptor();

const getNewToken = () =>
  axios.post<LoginResponse>(
    `${BASE_URL}${getRefreshTokenUrl()}`,
    {},
    {
      withCredentials: true, // Passing the cookie api-refresh-token to BE
      headers: {
        sessionId: getSessionId(),
      },
    }
  );

httpClient.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err: any) => {
    const originalConfig = err?.config as AxiosRequestConfig;
    const cookieImpersonate = getCookie("impersonated-token");
    const isImpersonateMode =
      cookieImpersonate && cookieImpersonate !== "" ? true : false;
    const isTokenExpired = DatetimeUtil.moment(
      getTokenExpirationTime()
    ).isBefore(DatetimeUtil.moment());
    const isSignInUrl =
      originalConfig.url === "/brand/auth/signin" ||
      originalConfig.url === "/retailer/auth/signin";
    const isUnauthorized = err?.response?.status === 401;

    if (
      !isImpersonateMode &&
      !isSignInUrl &&
      isUnauthorized &&
      isTokenExpired
    ) {
      try {
        const {
          data: { accessToken, expiresIn },
        } = await getNewToken();

        setAccessToken(accessToken, expiresIn);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Retry the http request
        return httpClient(originalConfig);
      } catch (error) {
        deleteAccessToken();
        window.location.reload();
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  }
);

const getRefreshTokenUrl = () => {
  const decodedToken: AccessToken = jwtDecode(getAccessToken() ?? "");
  let refreshTokenUrl = "/auth/refresh-token";
  if (decodedToken["cognito:groups"].find((group) => group === "Brand")) {
    refreshTokenUrl = "/brand" + refreshTokenUrl;
  }
  if (decodedToken["cognito:groups"].find((group) => group === "Retailer")) {
    refreshTokenUrl = "/retailer" + refreshTokenUrl;
  }
  if (
    decodedToken.username !== decodedToken.sub &&
    decodedToken.username.includes("google")
  ) {
    refreshTokenUrl =
      "/retailer/auth/sso-refresh-token/" + decodedToken.username;
  }
  return refreshTokenUrl;
};

export const useRefreshToken = () =>
  useQuery({
    queryKey: ["refresh-token"],
    queryFn: async () => {
      const {
        data: { accessToken, expiresIn },
      } = await getNewToken();
      setAccessToken(accessToken, expiresIn);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    },
  });

export const getErrorCodes = (error: any): ErrorCode[] => {
  const errorCodes = error?.response?.data?.code as ErrorCode[];

  if (errorCodes.length) {
    return errorCodes;
  } else {
    return ["ERR_000"];
  }
};

type ErrorCode = "AUTH_001" | "AUTH_003" | "AUTH_008" | "ERR_000";

export default httpClient;
