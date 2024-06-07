"use client";

import { CreateTaskRequestDto } from "@art-city/common/dto/task/create-task-request.dto";
import { TaskVisibleTo } from "@art-city/common/enums";
import { IProject } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  MultiSelect,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilePlus } from "@tabler/icons-react";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import {
  createTaskResolver,
  useCreateTask,
} from "@/hooks/features/task/useCreateTask";
import { useUsers } from "@/hooks/features/users/useUsers";

interface IProps {
  project: IProject;
  onSuccess?: () => void;
}

const CreateTaskButton: React.FC<IProps> = ({ project, onSuccess }) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { mutateAsync: createTaskMutateAsync, isPending: createTaskIsPending } =
    useCreateTask();

  const { data: users = [], isPending: userIsPending } = useUsers({});

  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [users]);

  const {
    control: createTaskControl,
    handleSubmit: createTaskHandleSubmit,
    formState: { errors: createTaskErrors },
    reset: createTaskReset,
    resetField: createTaskResetField,
    setValue: createTaskSetValue,
  } = useForm<CreateTaskRequestDto>({
    resolver: createTaskResolver,
    defaultValues: {
      projectId: project.id,
    },
  });

  const onSubmitCreateTask = async (data: CreateTaskRequestDto) => {
    await createTaskMutateAsync(
      {
        body: data,
      },
      {
        onSuccess: () => {
          closeModal();
          toast.success("成功");
          createTaskReset();
          onSuccess && onSuccess();
        },
        onError: (error) => {
          toastErrorCode(error);
        },
      }
    );
  };

  return (
    <>
      <Tooltip label={"創建任務"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconFilePlus />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={closeModal} title={`創建任務`}>
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
            control={createTaskControl}
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
            control={createTaskControl}
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
            control={createTaskControl}
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
            control={createTaskControl}
            defaultValue={undefined}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={closeModal}
              loading={createTaskIsPending}
            >
              取消
            </Button>
            <Button
              onClick={createTaskHandleSubmit(onSubmitCreateTask)}
              loading={createTaskIsPending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateTaskButton;
