import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IProject = {
  date: string;
};

export type IProjectsResponse = IProject[];

export const getProjectsApi: ApiObject = {
  url: "/project",
  method: ApiMethod.GET,
};

export const getProjects = async (
  payload?: UseRequestPayload
): Promise<IProjectsResponse> => {
  const res = await axiosClient.use(getProjectsApi, payload);
  const data = res.data.data;
  return data;
};

export const useProjects = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["get-projects"],
    queryFn: () => getProjects(payload),
  });
