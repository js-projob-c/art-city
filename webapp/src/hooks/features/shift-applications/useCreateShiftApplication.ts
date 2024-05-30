import { CreateShiftApplicationRequestDto } from "@art-city/common/dto/shift-application/create-shift-application-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ICreateShiftApplicationResponse = {};

export const createShiftApplicationApi: ApiObject = {
  url: "/shift-application/user",
  method: ApiMethod.POST,
};

export const createShiftApplicationResolver = classValidatorResolver(
  CreateShiftApplicationRequestDto
);

export const createShiftApplication = async (
  payload?: UseRequestPayload
): Promise<ICreateShiftApplicationResponse> => {
  const res = await axiosClient.use(createShiftApplicationApi, payload);
  const data = res.data.data;
  return data;
};

export const useCreateShiftApplication = () =>
  useMutation({
    mutationKey: ["create-shift-application"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      createShiftApplication(payload),
  });
