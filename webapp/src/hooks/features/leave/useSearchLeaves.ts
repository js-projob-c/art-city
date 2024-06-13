import { PaginationResponseDto } from "@art-city/common/dto/pagination/pagination-response.dto";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

import { ILeave } from "./useLeaves";

export type ILeavesResponse = PaginationResponseDto<ILeave>;

export const searchLeavesApi: ApiObject = {
  url: "/leave/search",
  method: ApiMethod.GET,
};

export const searchLeaves = async (
  payload?: UseRequestPayload
): Promise<ILeavesResponse> => {
  const res = await axiosClient.use(searchLeavesApi, payload);
  const data = res.data.data;
  return data;
};

export const useSearchLeaves = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["search-leave"],
    queryFn: () => searchLeaves(payload),
  });
