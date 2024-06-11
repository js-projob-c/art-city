import { AttendanceStatus } from "@art-city/common/enums";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IAttendance = {
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

export type IAttendancesResponse = IAttendance[];

export const getAttendancesApi: ApiObject = {
  url: "/attendance",
  method: ApiMethod.GET,
};

export const getAttendances = async (
  payload?: UseRequestPayload
): Promise<IAttendancesResponse> => {
  const res = await axiosClient.use(getAttendancesApi, payload);
  const data = res.data.data;
  return data;
};

export const useAttendances = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: [QUERY_KEY.ATTENDANCES_SIGN_IN_OR_OUT],
    queryFn: () => getAttendances(payload),
  });
