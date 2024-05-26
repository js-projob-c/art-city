import { useMutation } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export interface ISignInOrOutRequest {}

export interface ISignInOrOutResponse {}

export const signInOrOutApi: ApiObject = {
  url: "/attendance/sign",
  method: ApiMethod.POST,
};

export const signInOrOut = async (
  payload: UseRequestPayload<ISignInOrOutRequest>
): Promise<ISignInOrOutResponse> => {
  const res = await axiosClient.use(signInOrOutApi, payload);
  const data = res.data.data;
  return data;
};

export const useSignInOrOut = () =>
  useMutation({
    mutationKey: [QUERY_KEY.ATTENDANCES_SIGN_IN_OR_OUT],
    mutationFn: signInOrOut,
  });
