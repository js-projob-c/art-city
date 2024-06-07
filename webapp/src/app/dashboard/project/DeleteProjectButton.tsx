import { IProject } from "@art-city/common/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useDeleteProject } from "@/hooks/features/projects/useDeleteProject";

interface IProps {
  project: IProject;
  onSuccess?: () => void;
}

const MODAL_ID = "delete-project-modal";

const DeleteProjectButton: React.FC<IProps> = ({ project, onSuccess }) => {
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useDeleteProject();

  const onDeleteProject = async (projectId: string) => {
    await deleteMutateAsync(
      { param: { projectId } },
      {
        onSuccess: async () => {
          toast.success("Success");
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
      title: "刪除項目?",
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
      <ActionIcon variant="subtle" onClick={() => openDeleteModal(project.id)}>
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteProjectButton;
