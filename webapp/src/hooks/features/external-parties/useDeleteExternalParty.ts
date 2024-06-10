import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IDeleteExternalPartyResponse = {};

export const deleteExternalPartyApi: ApiObject = {
  url: "/external-party/:externalPartyId",
  method: ApiMethod.DELETE,
};

export const deleteExternalParty = async (
  payload?: UseRequestPayload
): Promise<IDeleteExternalPartyResponse> => {
  const res = await axiosClient.use(deleteExternalPartyApi, payload);
  const data = res.data.data;
  return data;
};

export const useDeleteExternalParty = () =>
  useMutation({
    mutationKey: ["delete-external-party"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      deleteExternalParty(payload),
  });
