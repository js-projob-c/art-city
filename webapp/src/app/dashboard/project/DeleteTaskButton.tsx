import { ITask } from "@art-city/common/types";
import { ActionIcon, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useDeleteTask } from "@/hooks/features/task/useDeleteTask";

interface IProps {
  task: ITask;
  onSuccess?: () => void;
}

const MODAL_ID = "delete-task-modal";

const DeleteTaskButton: React.FC<IProps> = ({ task, onSuccess }) => {
  const { mutateAsync: deleteMutateAsync, isPending: isDeletePending } =
    useDeleteTask();

  const onDeleteTask = async (taskId: string) => {
    await deleteMutateAsync(
      { param: { taskId } },
      {
        onSuccess: async () => {
          toast.success("成功刪除任務");
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
      title: "刪除任務?",
      centered: true,
      children: <></>,
      labels: { confirm: "刪除", cancel: "取消" },
      onCancel: () => {},
      onConfirm: () => onDeleteTask(id),
      confirmProps: { color: "red", loading: isDeletePending },
      cancelProps: { loading: isDeletePending },
      closeOnClickOutside: !isDeletePending,
    });

  return (
    <Tooltip label="刪除">
      <ActionIcon variant="subtle" onClick={() => openDeleteModal(task.id)}>
        <IconTrash />
      </ActionIcon>
    </Tooltip>
  );
};

export default DeleteTaskButton;
