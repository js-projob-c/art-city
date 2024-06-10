"use client";

import { UpdateExternalProjectRequestDto } from "@art-city/common/dto/external-project/update-external-project-request.dto";
import { ExternalPartyType } from "@art-city/common/enums";
import { ExternalProjectStatus } from "@art-city/common/enums/external-project";
import { IExternalParty } from "@art-city/common/types";
import { IExternalProject } from "@art-city/common/types/external-project";
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import { useExternalParties } from "@/hooks/features/external-parties/useGetExternalParty";
import {
  updateExternalProjectResolver,
  useUpdateExternalProject,
} from "@/hooks/features/external-projects/useUpdateExternalProject";

interface IProps {
  externalProject: IExternalProject & { externalParty: IExternalParty };
  onSuccess?: () => void;
}

const UpdateExternalProjectButton: React.FC<IProps> = ({
  externalProject,
  onSuccess,
}) => {
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

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdateExternalProject();

  const defaultFormValues = useMemo(() => {
    return {
      name: externalProject.name,
      description: externalProject.description,
      externalPartyId: externalProject.externalParty.id,
      status: externalProject.status,
    };
  }, [externalProject]);

  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { errors },
    reset: updateReset,
  } = useForm<UpdateExternalProjectRequestDto>({
    resolver: updateExternalProjectResolver,
    defaultValues: defaultFormValues,
  });

  const onCloseModal = () => {
    closeModal();
    updateReset();
  };

  const onSubmitForm = async (data: UpdateExternalProjectRequestDto) => {
    await updateMutateAsync(
      { param: { externalProjectId: externalProject.id }, body: data },
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
      <Tooltip label={"編輯外判項目"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={onCloseModal} title={`編輯外判項目`}>
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
              </Stack>
            )}
            name={"externalPartyId"}
            control={updateControl}
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
            control={updateControl}
            defaultValue={undefined}
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
              onClick={updateHandleSubmit(onSubmitForm)}
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

export default UpdateExternalProjectButton;
