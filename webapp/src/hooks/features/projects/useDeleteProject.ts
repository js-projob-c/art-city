import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IDeleteProjectResponse = {};

export const deleteProjectApi: ApiObject = {
  url: "/project/:projectId",
  method: ApiMethod.DELETE,
};

export const deleteProject = async (
  payload?: UseRequestPayload
): Promise<IDeleteProjectResponse> => {
  const res = await axiosClient.use(deleteProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useDeleteProject = () =>
  useMutation({
    mutationKey: ["delete-project"],
    mutationFn: (payload?: UseRequestPayload<any>) => deleteProject(payload),
  });
