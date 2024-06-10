"use client";

import { CreateExternalProjectRequestDto } from "@art-city/common/dto/external-project/create-external-project-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ICreateExternalProjectResponse = {};

export const createExternalProjectApi: ApiObject = {
  url: "/external-project",
  method: ApiMethod.POST,
};

export const createExternalProjectResolver = classValidatorResolver(
  CreateExternalProjectRequestDto
);

export const createExternalProject = async (
  payload?: UseRequestPayload
): Promise<ICreateExternalProjectResponse> => {
  const res = await axiosClient.use(createExternalProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useCreateExternalProject = () =>
  useMutation({
    mutationKey: ["create-external-project"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      createExternalProject(payload),
  });
