import { CreateTaskRequestDto } from "@art-city/common/dto/task/create-task-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ICreateTaskResponse = {};

export const createTaskApi: ApiObject = {
  url: "/task",
  method: ApiMethod.POST,
};

export const createTaskResolver = classValidatorResolver(CreateTaskRequestDto);

export const createTask = async (
  payload?: UseRequestPayload
): Promise<ICreateTaskResponse> => {
  const res = await axiosClient.use(createTaskApi, payload);
  const data = res.data.data;
  return data;
};

export const useCreateTask = () =>
  useMutation({
    mutationKey: ["create-task"],
    mutationFn: (payload?: UseRequestPayload<any>) => createTask(payload),
  });
