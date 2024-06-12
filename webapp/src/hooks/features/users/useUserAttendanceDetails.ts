import { AttendanceStatus } from "@art-city/common/enums";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserAttendanceDetailsResponse = Record<
  keyof typeof AttendanceStatus,
  number
>;

export const getUsersApi: ApiObject = {
  url: "/user/attendance-details",
  method: ApiMethod.GET,
};

export const getUserAttendanceDetails = async (
  payload?: UseRequestPayload
): Promise<IUserAttendanceDetailsResponse> => {
  const res = await axiosClient.use(getUsersApi, payload);
  const data = res.data.data;
  return data;
};

export const useUserAttendanceDetails = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user-attendance-details", payload?.query?.userId],
    queryFn: () => getUserAttendanceDetails(payload),
  });
