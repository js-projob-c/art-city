import { AttendanceStatus } from "@art-city/common/enums";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserAttendance = {
  id: string;
  signInAt: string | null;
  signOutAt: string | null;
  workHourFrom: string;
  workHourTo: string;
  supportDocument: string | null;
  createdAt: string;
  updatedAt: string;
  status: AttendanceStatus;
  remarks: string | null;
};

export type IUserAttendancesResponse = IUserAttendance[];

export const getUserAttendancesApi: ApiObject = {
  url: "/attendance/user",
  method: ApiMethod.GET,
};

export const getUserAttendances = async (
  payload?: UseRequestPayload
): Promise<IUserAttendancesResponse> => {
  const res = await axiosClient.use(getUserAttendancesApi, payload);
  const data = res.data.data;
  return data;
};

export const useUserAttendances = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: [QUERY_KEY.ATTENDANCES_SIGN_IN_OR_OUT],
    queryFn: () => getUserAttendances(payload),
  });
