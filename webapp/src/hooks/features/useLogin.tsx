import { LoginRequestDto } from "@art-city/common/dto/auth/LoginRequest.dto";
import { UserDepartment, UserRole } from "@art-city/common/enums";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { QUERY_KEY } from "@/common/constants/enums";
import { ACCESS_TOKEN_KEY } from "@/common/constants/variables";
import { EncryptionUtil } from "@/common/utils/encryption";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  department: UserDepartment;
  email: string;
  sub: string;
  role: UserRole;
}

export const loginApi: ApiObject = {
  url: "/auth/login",
  method: ApiMethod.POST,
};

export const loginResolver = classValidatorResolver(LoginRequestDto);

export const login = async (
  payload: UseRequestPayload<LoginRequest>
): Promise<LoginResponse> => {
  const res = await axiosClient.use(loginApi, payload);
  const data = res.data.data;

  const accessToken = data?.access_token;
  if (accessToken) {
    const encryptedToken = EncryptionUtil.encrypt(accessToken);
    Cookies.set(ACCESS_TOKEN_KEY, encryptedToken);
  } else {
    Cookies.remove(ACCESS_TOKEN_KEY);
  }

  return data;
};

export const logout = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};

export const useLogin = () =>
  useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: login,
  });
