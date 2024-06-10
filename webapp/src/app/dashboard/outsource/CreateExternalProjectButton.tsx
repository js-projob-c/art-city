"use client";

import { CreateExternalProjectRequestDto } from "@art-city/common/dto/external-project/create-external-project-request.dto";
import { ExternalPartyType } from "@art-city/common/enums";
import { ExternalProjectStatus } from "@art-city/common/enums/external-project";
import {
  Button,
  Flex,
  Modal,
  MultiSelect,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useExternalParties } from "@/hooks/features/external-parties/useGetExternalParty";
import {
  createExternalProjectResolver,
  useCreateExternalProject,
} from "@/hooks/features/external-projects/useCreateExternalProject";

import CreateExternalProjectPartyButton from "./CreateExternalProjectPartyButton";

interface IProps {
  onSuccess?: () => void;
}

const CreateExternalProjectButton: React.FC<IProps> = ({ onSuccess }) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { data: externalParties = [], refetch: refetchExternalParties } =
    useExternalParties({
      query: { type: ExternalPartyType.EXTERNAL_PROJECT },
    });

  const externalPartyOptions = useMemo(() => {
    return externalParties?.map((party) => ({
      value: party.id,
      label: party.company,
    }));
  }, [externalParties]);

  const externalProjectStatusOptions = Object.values(ExternalProjectStatus).map(
    (value) => ({
      value,
      label: value,
    })
  );

  const { mutateAsync: createMutateAsync, isPending: isCreatePending } =
    useCreateExternalProject();

  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    formState: { errors },
    reset: createReset,
  } = useForm<CreateExternalProjectRequestDto>({
    resolver: createExternalProjectResolver,
  });

  const onCloseModal = () => {
    closeModal();
    createReset();
  };

  const onSubmitForm = async (data: CreateExternalProjectRequestDto) => {
    await createMutateAsync(
      { body: data },
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

  return (
    <>
      <Button onClick={openModal}>{"創建外判項目"}</Button>
      <Modal opened={opened} onClose={onCloseModal} title={`創建外判項目`}>
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
              <Stack gap={5}>
                <Select
                  required
                  searchable
                  label="外判公司"
                  data={externalPartyOptions}
                  onBlur={onBlur}
                  error={error?.message}
                  onChange={onChange}
                  value={value}
                />
                <CreateExternalProjectPartyButton
                  onSuccess={refetchExternalParties}
                />
              </Stack>
            )}
            name={"externalPartyId"}
            control={createControl}
            defaultValue={undefined}
          />

          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                required
                label="狀態"
                data={externalProjectStatusOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"status"}
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

export default CreateExternalProjectButton;
