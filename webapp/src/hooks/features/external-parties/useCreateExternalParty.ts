"use client";

import { CreateExternalPartyRequestDto } from "@art-city/common/dto/external-party/create-external-party-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type ICreateExternalPartyResponse = {};

export const createExternalPartyApi: ApiObject = {
  url: "/external-party",
  method: ApiMethod.POST,
};

export const createExternalPartyResolver = classValidatorResolver(
  CreateExternalPartyRequestDto
);

export const createExternalParty = async (
  payload?: UseRequestPayload
): Promise<ICreateExternalPartyResponse> => {
  const res = await axiosClient.use(createExternalPartyApi, payload);
  const data = res.data.data;
  return data;
};

export const useCreateExternalParty = () =>
  useMutation({
    mutationKey: ["create-external-party"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      createExternalParty(payload),
  });
