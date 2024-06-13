import { PaginationResponseDto } from "@art-city/common/dto/pagination/pagination-response.dto";
import { IUser, IUserDetail } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUsersResponse = PaginationResponseDto<
  (IUser & { detail: IUserDetail })[]
>;

export const searchUsersApi: ApiObject = {
  url: "/user/search",
  method: ApiMethod.GET,
};

export const searchUsers = async (
  payload?: UseRequestPayload
): Promise<IUsersResponse> => {
  const res = await axiosClient.use(searchUsersApi, payload);
  const data = res.data.data;
  return data;
};

export const useSearchUsers = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => searchUsers(payload),
  });
