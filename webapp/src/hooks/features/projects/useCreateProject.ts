"use client";

import { CreateProjectRequestDto } from "@art-city/common/dto/project/create-project-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ICreateProjectResponse = {};

export const createProjectApi: ApiObject = {
  url: "/project",
  method: ApiMethod.POST,
};

export const createProjectResolver = classValidatorResolver(
  CreateProjectRequestDto
);

export const createProject = async (
  payload?: UseRequestPayload
): Promise<ICreateProjectResponse> => {
  const res = await axiosClient.use(createProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useCreateProject = () =>
  useMutation({
    mutationKey: ["create-project"],
    mutationFn: (payload?: UseRequestPayload<any>) => createProject(payload),
  });
