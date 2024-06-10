import { IExternalParty, IProject } from "@art-city/common/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useDeleteExternalParty } from "@/hooks/features/external-parties/useDeleteExternalParty";

interface IProps {
  externalParty: IExternalParty;
  onSuccess?: () => void;
}

const MODAL_ID = "delete-external-party-modal";

const DeleteExternalPartyButton: React.FC<IProps> = ({
  externalParty,
  onSuccess,
}) => {
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useDeleteExternalParty();

  const onDeleteProject = async (externalPartyId: string) => {
    await deleteMutateAsync(
      { param: { externalPartyId } },
      {
        onSuccess: async () => {
          toast.success("成功");
          modals.close(MODAL_ID);
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      id: MODAL_ID,
      title: "刪除外判第三方項目?",
      centered: true,
      children: <></>,
      labels: { confirm: "刪除", cancel: "取消" },
      onCancel: () => {},
      onConfirm: () => onDeleteProject(id),
      confirmProps: { color: "red", loading: isDeletePending },
      cancelProps: { loading: isDeletePending },
      closeOnClickOutside: !isDeletePending,
    });

  return (
    <Tooltip label="刪除">
      <ActionIcon
        variant="subtle"
        onClick={() => openDeleteModal(externalParty.id)}
      >
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteExternalPartyButton;
