"use client";

import { UpdateProjectRequestDto } from "@art-city/common/dto/project/update-project-request.dto";
import { ProjectStatus } from "@art-city/common/enums";
import { IProject, IUser } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  InputLabel,
  Modal,
  Select,
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
  updateProjectResolver,
  useUpdateProject,
} from "@/hooks/features/projects/useUpdateProject";
import { useUsers } from "@/hooks/features/users/useUsers";

interface IProps {
  project: IProject & { users: IUser[] };
  onSuccess?: () => void;
}

const UpdateProjectButton: React.FC<IProps> = ({ project, onSuccess }) => {
  const defaultFormValues = useMemo(() => {
    return {
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      isAbandoned: project.status === ProjectStatus.ABANDONED,
    };
  }, [project]);

  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdateProject();

  const { data: users = [], isPending: userIsPending } = useUsers({});

  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [users]);

  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { errors: updateErrors },
    reset: updateReset,
    resetField: updateResetField,
    setValue: updateSetValue,
  } = useForm<UpdateProjectRequestDto>({
    resolver: updateProjectResolver,
  });

  const onCloseModal = () => {
    closeModal();
    updateReset();
  };

  const onSubmitUpdateProject = async (data: UpdateProjectRequestDto) => {
    await updateMutateAsync(
      {
        body: data,
        param: { projectId: project.id },
      },
      {
        onSuccess: async () => {
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
    updateReset(defaultFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFormValues]);

  return (
    <>
      <Tooltip label={"編輯項目"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={onCloseModal} title={`編輯項目`}>
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
            control={updateControl}
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
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
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
            name={"ownerId"}
            control={updateControl}
            defaultValue={undefined}
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
            control={updateControl}
            defaultValue={project.status === ProjectStatus.ABANDONED}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={onCloseModal}
              loading={isUpdatePending}
            >
              取消
            </Button>
            <Button
              onClick={updateHandleSubmit(onSubmitUpdateProject)}
              loading={isUpdatePending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default UpdateProjectButton;
