"use client";

import { CreateProjectRequestDto } from "@art-city/common/dto/project/create-project-request.dto";
import { Button, Flex, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import {
  createProjectResolver,
  useCreateProject,
} from "@/hooks/features/projects/useCreateProject";
import { useUsers } from "@/hooks/features/users/useUsers";

interface IProps {
  onSuccess?: () => void;
}

const CreateProjectButton: React.FC<IProps> = ({ onSuccess }) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { mutateAsync: createMutateAsync, isPending: isCreatePending } =
    useCreateProject();

  const { data: users = [], isPending: userIsPending } = useUsers({});

  const userOptions = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [users]);

  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    formState: { errors },
    reset: createReset,
  } = useForm<CreateProjectRequestDto>({
    resolver: createProjectResolver,
  });

  const onCloseModal = () => {
    closeModal();
    createReset();
  };

  const onSubmitForm = async (data: CreateProjectRequestDto) => {
    await createMutateAsync(
      { body: data },
      {
        onSuccess: async () => {
          toast.success("Success");
          onCloseModal();
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
      <Button onClick={openModal}>{"創建項目"}</Button>
      <Modal opened={opened} onClose={onCloseModal} title={`創建項目`}>
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
            control={createControl}
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
            control={createControl}
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
            control={createControl}
            defaultValue={undefined}
          />
          <Flex gap={"md"} justify={"flex-end"}>
            <Button
              variant="outline"
              onClick={onCloseModal}
              loading={isCreatePending}
            >
              取消
            </Button>
            <Button
              onClick={createHandleSubmit(onSubmitForm)}
              loading={isCreatePending}
            >
              確認
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateProjectButton;
