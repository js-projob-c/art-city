import { IUser } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUsersResponse = IUser[];

export const getUsersApi: ApiObject = {
  url: "/user",
  method: ApiMethod.GET,
};

export const getUsers = async (
  payload?: UseRequestPayload
): Promise<IUsersResponse> => {
  const res = await axiosClient.use(getUsersApi, payload);
  const data = res.data.data;
  return data;
};

export const useUsers = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["search-users"],
    queryFn: () => getUsers(payload),
  });
