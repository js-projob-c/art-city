import { useMutation } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";

import { LoginResponse } from "@/common/constants/types";

const USER_POOL = process.env.NEXT_PUBLIC_USER_POOL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const GOOGLE_URL = `https://${USER_POOL!}.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${REDIRECT_URI!}&response_type=CODE&client_id=${CLIENT_ID!}&scope=aws.cognito.signin.user.admin email openid`;

const BRAND_LOGIN = "/brand/auth/signin";
const RETAILER_LOGIN = "/retailer/auth/signin";
const RETAILER_LOGIN_SSO = "/retailer/auth/sso-signin";

export type LoginRequest = {
  username: string;
  password: string;
};

export type SSOLoginRequest = {
  codeGrant: string;
};

const brandLogin = async (form: LoginRequest) =>
  await httpClient.post<LoginResponse>(`${BRAND_LOGIN}`, form);
const retailerLogin = async (form: LoginRequest) =>
  await httpClient.post<LoginResponse>(`${RETAILER_LOGIN}`, form);
const retailerLoginSSO = async (form: SSOLoginRequest) =>
  await httpClient.post<LoginResponse>(`${RETAILER_LOGIN_SSO}`, form);

export const useBrandLogin = () => useMutation(brandLogin);
export const useRetailerLogin = () => useMutation(retailerLogin);
export const useRetailerLoginSSO = () => useMutation(retailerLoginSSO);

export const getUserType = (accessToken: string): UserType | undefined => {
  const decodedToken: AccessToken = jwtDecode(accessToken);
  const cookieImpersonate = getCookie("impersonated-token");
  if (cookieImpersonate) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const decodedCookie = jwtDecode(cookieImpersonate) as AccessToken;
    return decodedCookie.profile as UserType | undefined;
  }
  let roles = decodedToken["cognito:groups"];
  roles = roles.filter((role) => !role.toLowerCase().includes("google"));
  return roles[0] as UserType | undefined;
};

export type UserType = "Guest" | "Retailer" | "Brand";

export const isSSOLogin = (accessToken: string) => {
  const decodedToken: AccessToken = jwtDecode(accessToken);
  return decodedToken.username.includes("google");
};
