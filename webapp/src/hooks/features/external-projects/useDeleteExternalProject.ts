import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IDeleteExternalProjectResponse = {};

export const deleteExternalProjectApi: ApiObject = {
  url: "/external-project/:externalProjectId",
  method: ApiMethod.DELETE,
};

export const deleteExternalProject = async (
  payload?: UseRequestPayload
): Promise<IDeleteExternalProjectResponse> => {
  const res = await axiosClient.use(deleteExternalProjectApi, payload);
  const data = res.data.data;
  return data;
};

export const useDeleteExternalProject = () =>
  useMutation({
    mutationKey: ["delete-external-project"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      deleteExternalProject(payload),
  });
