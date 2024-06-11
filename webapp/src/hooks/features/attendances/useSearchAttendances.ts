import { PaginationResponseDto } from "@art-city/common/dto/pagination/pagination-response.dto";
import { IAttendance } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IAttendancesResponse = PaginationResponseDto<IAttendance[]>;

export const getAttendancesApi: ApiObject = {
  url: "/attendance/search",
  method: ApiMethod.GET,
};

export const searchAttendances = async (
  payload?: UseRequestPayload
): Promise<IAttendancesResponse> => {
  const res = await axiosClient.use(getAttendancesApi, payload);
  const data = res.data.data;
  return data;
};

export const useSearchAttendances = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["search-attendances"],
    queryFn: () => searchAttendances(payload),
  });
