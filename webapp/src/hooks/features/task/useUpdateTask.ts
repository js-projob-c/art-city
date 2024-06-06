import { UpdateTaskRequestDto } from "@art-city/common/dto/task/update-task-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUpdateTaskResponse = {};

export const updateTaskApi: ApiObject = {
  url: "/task/:taskId",
  method: ApiMethod.PUT,
};

export const updateTaskResolver = classValidatorResolver(UpdateTaskRequestDto);

export const updateTask = async (
  payload?: UseRequestPayload
): Promise<IUpdateTaskResponse> => {
  const res = await axiosClient.use(updateTaskApi, payload);
  const data = res.data.data;
  return data;
};

export const useUpdateTask = () =>
  useMutation({
    mutationKey: ["update-task"],
    mutationFn: (payload?: UseRequestPayload<any>) => updateTask(payload),
  });
