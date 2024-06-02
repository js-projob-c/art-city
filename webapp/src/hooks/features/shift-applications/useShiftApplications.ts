import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IShiftApplication = {
  date: string;
};

export type IShiftApplicationsResponse = IShiftApplication[];

export const getShiftApplicationsApi: ApiObject = {
  url: "/shift-application",
  method: ApiMethod.GET,
};

export const getShiftApplications = async (
  payload?: UseRequestPayload
): Promise<IShiftApplicationsResponse> => {
  const res = await axiosClient.use(getShiftApplicationsApi, payload);
  const data = res.data.data;
  return data;
};

export const useShiftApplications = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["shift-applications"],
    queryFn: () => getShiftApplications(payload),
  });
