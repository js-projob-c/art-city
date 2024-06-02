import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ILeave = {
  date: string;
};

export type ILeavesResponse = ILeave[];

export const getLeavesApi: ApiObject = {
  url: "/leave",
  method: ApiMethod.GET,
};

export const getLeaves = async (
  payload?: UseRequestPayload
): Promise<ILeavesResponse> => {
  const res = await axiosClient.use(getLeavesApi, payload);
  const data = res.data.data;
  return data;
};

export const useLeaves = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["user-leaves"],
    queryFn: () => getLeaves(payload),
  });
