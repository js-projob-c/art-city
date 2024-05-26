import { AttendanceStatus } from "@art-city/common/enums";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import { ApiMethod, ApiObject, axiosClient } from "@/services/axios";

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

export const signInOrOutApi: ApiObject = {
  url: "/attendance/user",
  method: ApiMethod.GET,
};

export const signInOrOut = async (): Promise<IUserAttendancesResponse> => {
  const res = await axiosClient.use(signInOrOutApi);
  const data = res.data.data;
  return data;
};

export const useUserAttendances = () =>
  useQuery({
    queryKey: [QUERY_KEY.ATTENDANCES_SIGN_IN_OR_OUT],
    queryFn: signInOrOut,
  });
