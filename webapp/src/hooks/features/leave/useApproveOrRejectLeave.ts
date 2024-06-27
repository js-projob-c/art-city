import { ApproveOrRejectLeaveRequestDto } from "@art-city/common/dto/leave/ApproveOrRejectLeaveRequest.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useMutation } from "@tanstack/react-query";

import {
  ApiMethod,
  ApiObject,
  axiosClient,
  UseRequestPayload,
} from "@/services/axios";

export type IApproveOrRejectLeaveResponse = {};

export const approveOrRejectLeaveRequestApi: ApiObject = {
  url: "/leave/approval/:leaveId",
  method: ApiMethod.PUT,
};

export const approveOrRejectLeaveRequestResolver = classValidatorResolver(
  ApproveOrRejectLeaveRequestDto
);

export const approveOrRejectLeaveRequest = async (
  payload?: UseRequestPayload
): Promise<IApproveOrRejectLeaveResponse> => {
  const res = await axiosClient.use(approveOrRejectLeaveRequestApi, payload);
  const data = res.data.data;
  return data;
};

export const useApproveOrRejectLeave = () =>
  useMutation({
    mutationKey: ["approve-or-reject-leave-request"],
    mutationFn: (payload?: UseRequestPayload<any>) =>
      approveOrRejectLeaveRequest(payload),
  });
