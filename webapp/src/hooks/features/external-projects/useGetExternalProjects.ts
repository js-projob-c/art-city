"use client";

import { IExternalProject } from "@art-city/common/types/external-project";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IExternalProjectsResponse = IExternalProject[];

export const getExternalProjectsApi: ApiObject = {
  url: "/external-project",
  method: ApiMethod.GET,
};

export const getExternalProjects = async (
  payload?: UseRequestPayload
): Promise<IExternalProjectsResponse> => {
  const res = await axiosClient.use(getExternalProjectsApi, payload);
  const data = res.data.data;
  return data;
};

export const useExternalProjects = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["get-external-projects"],
    queryFn: () => getExternalProjects(payload),
  });
