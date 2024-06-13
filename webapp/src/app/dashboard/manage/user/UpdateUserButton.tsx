"use client";

import { UpdateExternalPartyRequestDto } from "@art-city/common/dto/external-party/update-external-party-request.dto";
import { UpdateUserRequestDto } from "@art-city/common/dto/user/update-user-request.dto";
import {
  ExternalPartyType,
  UserDepartment,
  UserRole,
} from "@art-city/common/enums";
import { IExternalParty, IUser, IUserDetail } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  InputError,
  InputLabel,
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
import { defaultCountries, parseCountry } from "react-international-phone";

import { toastErrorCode } from "@/common/utils/toast";
import {
  updateExternalPartyResolver,
  useUpdateExternalParty,
} from "@/hooks/features/external-parties/useUpdateExternalParty";
import { useUpdateUser } from "@/hooks/features/users/useUpdateUser";

interface IProps {
  user: IUser & { detail: IUserDetail };
  onSuccess?: () => void;
}

const UpdateUserButton: React.FC<IProps> = ({ user, onSuccess }) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["hk"].includes(iso2);
  });

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdateUser();

  const defaultFormValues = useMemo(() => {
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      role: user?.role,
      department: user?.department,
      monthlySalary: user?.detail?.monthlySalary,
      annualLeave: user?.detail?.annualLeave,
    };
  }, [user]);

  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { errors },
    reset: updateReset,
  } = useForm<UpdateUserRequestDto>({
    resolver: updateExternalPartyResolver,
    defaultValues: defaultFormValues,
  });

  const onCloseModal = () => {
    closeModal();
    updateReset();
  };

  const onSubmitForm = async (data: UpdateUserRequestDto) => {
    await updateMutateAsync(
      { param: { userId: user.id }, body: data },
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
      <Tooltip label={"編輯用戶"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={onCloseModal} title={`編輯用戶`}>
        <Stack gap={"lg"}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="姓"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"lastName"}
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="名"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"firstName"}
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                data={Object.values(UserRole).map((role) => ({
                  label: role,
                  value: role,
                }))}
                label="職位"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"role"}
            control={updateControl}
            defaultValue={undefined}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                data={Object.values(UserDepartment).map((role) => ({
                  label: role,
                  value: role,
                }))}
                label="部門"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"department"}
            control={updateControl}
            defaultValue={undefined}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="月薪"
                onBlur={onBlur}
                error={error?.message}
                onChange={(e) =>
                  onChange(parseFloat(e.target.value) ?? undefined)
                }
                value={value}
                required
                type="number"
              />
            )}
            name={"monthlySalary"}
            control={updateControl}
            defaultValue={undefined}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="年假"
                onBlur={onBlur}
                error={error?.message}
                onChange={(e) =>
                  onChange(parseInt(e.target.value) ?? undefined)
                }
                value={value}
                required
                type="number"
              />
            )}
            name={"annualLeave"}
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

export default UpdateUserButton;
