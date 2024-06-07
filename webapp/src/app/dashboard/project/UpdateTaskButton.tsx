"use client";

import { UpdateTaskRequestDto } from "@art-city/common/dto/task/update-task-request.dto";
import { TaskStatus, TaskVisibleTo } from "@art-city/common/enums";
import { ITask, IUser } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  InputError,
  InputLabel,
  Modal,
  MultiSelect,
  Select,
  Slider,
  Stack,
  Switch,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import {
  updateTaskResolver,
  useUpdateTask,
} from "@/hooks/features/task/useUpdateTask";
import { useUsers } from "@/hooks/features/users/useUsers";

interface IProps {
  task: ITask & { users: IUser[] };
  onSuccess?: () => void;
}

const UpdateTaskButton: React.FC<IProps> = ({ task, onSuccess }) => {
  const defaultFormValues = useMemo(() => {
    return {
      name: task.name,
      description: task.description,
      progress: task.progress,
      visibleTo: task.visibleTo,
      ownerIds: task.users.map((user) => user.id),
      isAbandoned: task.status === TaskStatus.ABANDONED,
    };
  }, [task]);

  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { mutateAsync: updateTaskMutateAsync, isPending: updateTaskIsPending } =
    useUpdateTask();

  const { data: users = [], isPending: userIsPending } = useUsers({});

  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [users]);

  const {
    control: updateTaskControl,
    handleSubmit: updateTaskHandleSubmit,
    formState: { errors: updateTaskErrors },
    reset: updateTaskReset,
    resetField: updateTaskResetField,
    setValue: updateTaskSetValue,
  } = useForm<UpdateTaskRequestDto>({
    resolver: updateTaskResolver,
  });

  const onCloseModal = () => {
    closeModal();
    updateTaskReset();
  };

  const onSubmitUpdateTask = async (data: UpdateTaskRequestDto) => {
    await updateTaskMutateAsync(
      {
        param: { taskId: task.id },
        body: data,
      },
      {
        onSuccess: () => {
          toast.success("成功");
          onCloseModal();
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  useEffect(() => {
    updateTaskReset(defaultFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFormValues]);

  return (
    <>
      <Tooltip label={"編輯任務"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={onCloseModal} title={`編輯任務`}>
        <Stack gap={"lg"}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="名稱"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required={true}
              />
            )}
            name={"name"}
            control={updateTaskControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="描述"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required={true}
              />
            )}
            name={"description"}
            control={updateTaskControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <MultiSelect
                clearable
                searchable
                label="負責人"
                data={userOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"ownerIds"}
            control={updateTaskControl}
            defaultValue={[]}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                required
                clearable
                searchable
                label="可見對象"
                data={Object.values(TaskVisibleTo).map((value) => ({
                  value,
                  label: value,
                }))}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"visibleTo"}
            control={updateTaskControl}
            defaultValue={undefined}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <InputLabel required>進度</InputLabel>
                <Slider
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  marks={[
                    { value: 0, label: "0%" },
                    { value: 50, label: "50%" },
                    { value: 100, label: "100%" },
                  ]}
                />
                <InputError>{error?.message}</InputError>
              </>
            )}
            name={"progress"}
            control={updateTaskControl}
            defaultValue={task.progress || 0}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              console.log("valuevaluevalue", value);
              return (
                <Stack>
                  <InputLabel required>棄置</InputLabel>
                  <Switch
                    onBlur={onBlur}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                </Stack>
              );
            }}
            name={"isAbandoned"}
            control={updateTaskControl}
            defaultValue={task.status === TaskStatus.ABANDONED}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={closeModal}
              loading={updateTaskIsPending}
            >
              取消
            </Button>
            <Button
              onClick={updateTaskHandleSubmit(onSubmitUpdateTask)}
              loading={updateTaskIsPending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default UpdateTaskButton;
