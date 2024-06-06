import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IDeleteTaskResponse = {};

export const deleteTaskApi: ApiObject = {
  url: "/task/:taskId",
  method: ApiMethod.DELETE,
};

export const deleteTask = async (
  payload?: UseRequestPayload
): Promise<IDeleteTaskResponse> => {
  const res = await axiosClient.use(deleteTaskApi, payload);
  const data = res.data.data;
  return data;
};

export const useDeleteTask = () =>
  useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (payload?: UseRequestPayload<any>) => deleteTask(payload),
  });
