import { PaginationResponseDto } from "@art-city/common/dto/pagination/pagination-response.dto";
import { IUser, IUserDetail } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserAttendanceDetailsResponse = PaginationResponseDto<
  (IUser & { detail: IUserDetail })[]
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
    queryKey: ["users"],
    queryFn: () => getUserAttendanceDetails(payload),
  });
