"use client";

import { UpdateExternalProjectRequestDto } from "@art-city/common/dto/external-project/update-external-project-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUpdateExternalProjectResponse = {};

export const updateExternalProjectApi: ApiObject = {
  url: "/external-project/:externalProjectId",
  method: ApiMethod.PUT,
};

export const updateExternalProjectResolver = classValidatorResolver(
  UpdateExternalProjectRequestDto
);

export const updateExternalProject = async (
  payload?: UseRequestPayload
): Promise<IUpdateExternalProjectResponse> => {
  const res = await axiosClient.use(updateExternalProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useUpdateExternalProject = () =>
  useMutation({
    mutationKey: ["update-external-project"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      updateExternalProject(payload),
  });
