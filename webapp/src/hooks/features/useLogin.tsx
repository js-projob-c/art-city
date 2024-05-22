import { LoginRequestDto } from "@art-city/common/dto/auth/LoginRequest.dto";
import { UserDepartment, UserRole } from "@art-city/common/enums";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
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
  return data;
};

export const useLogin = () =>
  useMutation({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: login,
  });
