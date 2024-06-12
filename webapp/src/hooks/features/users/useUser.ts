import {
  GetUserResponseDetailDto,
  GetUserResponseDto,
} from "@art-city/common/dto/user/get-user-response.dto";
import { IUser, IUserDetail } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUsersResponse = Omit<IUser, keyof GetUserResponseDto> & {
  detail: Omit<IUserDetail, keyof GetUserResponseDetailDto>;
};

export const getUserApi: ApiObject = {
  url: "/user/:userId",
  method: ApiMethod.GET,
};

export const getUser = async (
  payload?: UseRequestPayload
): Promise<IUsersResponse> => {
  const res = await axiosClient.use(getUserApi, payload);
  const data = res.data.data;
  return data;
};

export const useUser = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user", payload?.param?.userId],
    queryFn: () => getUser(payload),
  });
