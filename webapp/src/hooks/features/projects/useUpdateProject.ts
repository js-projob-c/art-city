import { UpdateProjectRequestDto } from "@art-city/common/dto/project/update-project-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUpdateProjectResponse = {};

export const updateProjectApi: ApiObject = {
  url: "/project/:projectId",
  method: ApiMethod.PUT,
};

export const updateProjectResolver = classValidatorResolver(
  UpdateProjectRequestDto
);

export const updateProject = async (
  payload?: UseRequestPayload
): Promise<IUpdateProjectResponse> => {
  const res = await axiosClient.use(updateProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useUpdateProject = () =>
  useMutation({
    mutationKey: ["update-project"],
    mutationFn: (payload?: UseRequestPayload<any>) => updateProject(payload),
  });
