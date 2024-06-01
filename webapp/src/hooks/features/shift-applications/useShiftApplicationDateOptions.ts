import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/common/constants/enums";
import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IUserSchedule = {
  date: string;
};

export type IApplicationDateOptionsResponse = IUserSchedule[];

export const getApplicationDateOptionsApi: ApiObject = {
  url: "/shift-application/user/date-options",
  method: ApiMethod.GET,
};

export const getApplicationDateOptions = async (
  payload?: UseRequestPayload
): Promise<IApplicationDateOptionsResponse> => {
  const res = await axiosClient.use(getApplicationDateOptionsApi, payload);
  const data = res.data.data;
  return data;
};

export const useShiftApplicationDateOptions = (
  payload?: UseRequestPayload<any>
) =>
  useQuery({
    queryKey: ["shift-application-options"],
    queryFn: () => getApplicationDateOptions(payload),
  });
