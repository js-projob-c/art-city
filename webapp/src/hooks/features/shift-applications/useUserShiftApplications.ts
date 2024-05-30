import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserShiftApplication = {
  date: string;
};

export type IUserShiftApplicationsResponse = IUserShiftApplication[];

export const getUserShiftApplicationsApi: ApiObject = {
  url: "/shift-application/user",
  method: ApiMethod.GET,
};

export const getUserShiftApplications = async (
  payload?: UseRequestPayload
): Promise<IUserShiftApplicationsResponse> => {
  const res = await axiosClient.use(getUserShiftApplicationsApi, payload);
  const data = res.data.data;
  return data;
};

export const useUserShiftApplications = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user-shift-applications"],
    queryFn: () => getUserShiftApplications(payload),
  });
