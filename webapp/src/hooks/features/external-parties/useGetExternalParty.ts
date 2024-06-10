"use client";

import { IExternalParty } from "@art-city/common/types";
import { useQuery } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IProjectsResponse = IExternalParty[];

export const getExternalPartiesApi: ApiObject = {
  url: "/external-party",
  method: ApiMethod.GET,
};

export const getExternalParties = async (
  payload?: UseRequestPayload
): Promise<IProjectsResponse> => {
  const res = await axiosClient.use(getExternalPartiesApi, payload);
  const data = res.data.data;
  return data;
};

export const useExternalParties = (payload?: UseRequestPayload<any>) =>
  useQuery({
    queryKey: ["get-external-parties"],
    queryFn: () => getExternalParties(payload),
  });
