import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export interface ISignInOrOutRequest {}

export interface ISignInOrOutResponse {
  workHourFrom: string;
  workHourTo: string;
}

export const getWorkingHoursApi: ApiObject = {
  url: "/system/working-hours",
  method: ApiMethod.GET,
};

export const getWorkingHours = async (
  payload?: UseRequestPayload
): Promise<ISignInOrOutResponse> => {
  const res = await axiosClient.use(getWorkingHoursApi, payload);
  const data = res.data.data;
  return data;
};

export const useGetWorkingHours = (payload?: UseRequestPayload) =>
  useQuery({
    queryKey: [QUERY_KEY.WORKING_HOURS],
    queryFn: () => getWorkingHours(payload),
  });
