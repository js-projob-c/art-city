import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserSchedule = {
  date: string;
};

export type IUserSchedulesResponse = IUserSchedule[];

export const getUserSchedulesApi: ApiObject = {
  url: "/schedule/user",
  method: ApiMethod.GET,
};

export const getUserSchedules = async (
  payload?: UseRequestPayload
): Promise<IUserSchedulesResponse> => {
  const res = await axiosClient.use(getUserSchedulesApi, payload);
  const data = res.data.data;
  return data;
};

export const useUserSchedules = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user-schedules"],
    queryFn: () => getUserSchedules(payload),
  });
