"use client";

import { ILeave } from "@art-city/common/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useApproveOrRejectLeave } from "@/hooks/features/leave/useApproveOrRejectLeave";

interface IProps {
  leave: ILeave;
  onSuccess?: () => void;
}

const MODAL_ID = "approve-or-reject-leave-modal";

const ApproveOrRejectLeaveButton: React.FC<IProps> = ({ leave, onSuccess }) => {
  const { mutateAsync: mutateAsync, isPending: isPending } =
    useApproveOrRejectLeave();

  const onCloseModal = () => {
    modals.close(MODAL_ID);
    onSuccess && onSuccess();
  };

  const openApproveOrRejectModal = () =>
    modals.openConfirmModal({
      id: MODAL_ID,
      title: "批核休假申請",
      centered: true,
      children: <></>,
      labels: { confirm: "批准", cancel: "拒絕" },
      onCancel: () => onApproveOrRejectLeave(false),
      onConfirm: () => onApproveOrRejectLeave(true),
      confirmProps: { color: "green", loading: isPending },
      cancelProps: { color: "red", loading: isPending },
      closeOnClickOutside: !isPending,
    });

  const onApproveOrRejectLeave = async (isApprove: boolean) => {
    await mutateAsync(
      { body: { isApprove }, param: { leaveId: leave.id } },
      {
        onSuccess() {
          toast.success("成功");
          onCloseModal();
        },
        onError(error, variables, context) {
          toastErrorCode(error);
        },
      }
    );
  };

  return (
    <>
      <Tooltip label={"批核休假申請"}>
        <ActionIcon variant="subtle" onClick={openApproveOrRejectModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

export default ApproveOrRejectLeaveButton;
