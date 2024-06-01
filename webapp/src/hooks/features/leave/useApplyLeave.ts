import { CreateLeaveRequestDto } from "@art-city/common/dto/leave/createLeaveRequest.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IApplyLeaveResponse = {};

export const createLeaveRequestApi: ApiObject = {
  url: "/leave/application",
  method: ApiMethod.POST,
};

export const createLeaveRequestResolver = classValidatorResolver(
  CreateLeaveRequestDto
);

export const createLeaveRequest = async (
  payload?: UseRequestPayload
): Promise<IApplyLeaveResponse> => {
  const res = await axiosClient.use(createLeaveRequestApi, payload);
  const data = res.data.data;
  return data;
};

export const useApplyLeave = () =>
  useMutation({
    mutationKey: ["create-leave-request"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      createLeaveRequest(payload),
  });
