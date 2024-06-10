"use client";

import { UpdateExternalPartyRequestDto } from "@art-city/common/dto/external-party/update-external-party-request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUpdateExternalPartyResponse = {};

export const updateExternalPartyApi: ApiObject = {
  url: "/external-party/:externalPartyId",
  method: ApiMethod.PUT,
};

export const updateExternalPartyResolver = classValidatorResolver(
  UpdateExternalPartyRequestDto
);

export const updateExternalParty = async (
  payload?: UseRequestPayload
): Promise<IUpdateExternalPartyResponse> => {
  const res = await axiosClient.use(updateExternalPartyApi, payload);
  const data = res.data.data;
  return data;
};

export const useUpdateExternalParty = () =>
  useMutation({
    mutationKey: ["update-external-party"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      updateExternalParty(payload),
  });
