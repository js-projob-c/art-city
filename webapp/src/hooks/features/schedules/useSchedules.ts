import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ISchedule = {
  date: string;
};

export type ISchedulesResponse = ISchedule[];

export const getSchedulesApi: ApiObject = {
  url: "/schedule",
  method: ApiMethod.GET,
};

export const getSchedules = async (
  payload?: UseRequestPayload
): Promise<ISchedulesResponse> => {
  const res = await axiosClient.use(getSchedulesApi, payload);
  const data = res.data.data;
  return data;
};

export const useSchedules = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["schedules"],
    queryFn: () => getSchedules(payload),
  });
