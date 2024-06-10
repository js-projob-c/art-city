import { UpdateUserRequestDto } from "@art-city/common/dto/user/update-user-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUpdateUserResponse = {};

export const updateUserApi: ApiObject = {
  url: "/user/:userId",
  method: ApiMethod.PUT,
};

export const updateUserResolver = classValidatorResolver(UpdateUserRequestDto);

export const updateUser = async (
  payload?: UseRequestPayload
): Promise<IUpdateUserResponse> => {
  const res = await axiosClient.use(updateUserApi, payload);
  const data = res.data.data;
  return data;
};

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ["update-task"],
    mutationFn: (payload?: UseRequestPayload<any>) => updateUser(payload),
  });
