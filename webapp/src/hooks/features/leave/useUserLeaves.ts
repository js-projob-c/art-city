import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserLeave = {
  date: string;
};

export type IUserLeavesResponse = IUserLeave[];

export const getUserLeavesApi: ApiObject = {
  url: "/leave/user",
  method: ApiMethod.GET,
};

export const getUserLeaves = async (
  payload?: UseRequestPayload
): Promise<IUserLeavesResponse> => {
  const res = await axiosClient.use(getUserLeavesApi, payload);
  const data = res.data.data;
  return data;
};

export const useUserLeaves = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user-leaves"],
    queryFn: () => getUserLeaves(payload),
  });
