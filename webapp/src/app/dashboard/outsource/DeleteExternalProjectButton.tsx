import { IProject } from "@art-city/common/types";
import { IExternalProject } from "@art-city/common/types/external-project";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useDeleteExternalProject } from "@/hooks/features/external-projects/useDeleteExternalProject";

interface IProps {
  externalProject: IExternalProject;
  onSuccess?: () => void;
}

const MODAL_ID = "delete-external-project-modal";

const DeleteExternalProjectButton: React.FC<IProps> = ({
  externalProject,
  onSuccess,
}) => {
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useDeleteExternalProject();

  const onDeleteProject = async (externalProjectId: string) => {
    await deleteMutateAsync(
      { param: { externalProjectId } },
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
        onClick={() => openDeleteModal(externalProject.id)}
      >
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteExternalProjectButton;
