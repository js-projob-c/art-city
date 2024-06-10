"use client";

import { UpdateExternalPartyRequestDto } from "@art-city/common/dto/dto/update-external-party-request.dto";
import { ExternalPartyType } from "@art-city/common/enums";
import { IExternalParty } from "@art-city/common/types";
import {
  ActionIcon,
  Button,
  Flex,
  InputError,
  InputLabel,
  Modal,
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
import InternationalPhoneInput from "@/components/Forms/InternationalPhoneInput";
import {
  updateExternalPartyResolver,
  useUpdateExternalParty,
} from "@/hooks/features/external-parties/useUpdateExternalParty";

interface IProps {
  externalParty: IExternalParty;
  onSuccess?: () => void;
}

const UpdateExternalPartyButton: React.FC<IProps> = ({
  externalParty,
  onSuccess,
}) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["hk"].includes(iso2);
  });

  const { mutateAsync: updateMutateAsync, isPending: isUpdatePending } =
    useUpdateExternalParty();

  const defaultFormValues = useMemo(() => {
    return {
      company: externalParty.company,
      contactName: externalParty.contactName,
      contactRole: externalParty.contactRole,
      email: externalParty.email,
      phone: externalParty.phone,
    };
  }, [externalParty]);

  const {
    control: updateControl,
    handleSubmit: updateHandleSubmit,
    formState: { errors },
    reset: updateReset,
  } = useForm<UpdateExternalPartyRequestDto>({
    resolver: updateExternalPartyResolver,
    defaultValues: defaultFormValues,
  });

  const onCloseModal = () => {
    closeModal();
    updateReset();
  };

  const onSubmitForm = async (data: UpdateExternalPartyRequestDto) => {
    await updateMutateAsync(
      { param: { externalPartyId: externalParty.id }, body: data },
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
      <Tooltip label={"編輯外判公司"}>
        <ActionIcon variant="subtle" onClick={openModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={onCloseModal} title={`編輯外判公司`}>
        <Stack gap={"lg"}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="公司名稱"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"company"}
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="聯絡人名稱"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"contactName"}
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="聯絡人職位"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
            name={"contactRole"}
            control={updateControl}
            defaultValue={""}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="聯絡人電郵"
                onBlur={onBlur}
                error={error?.message}
                onChange={(value) => onChange(value || undefined)}
                value={value}
              />
            )}
            name={"email"}
            control={updateControl}
            defaultValue={undefined}
          />
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <InputLabel>電話</InputLabel>
                <InternationalPhoneInput
                  inputStyle={{
                    margin: 0,
                    width: "100%",
                  }}
                  hideDropdown
                  disableCountryGuess
                  forceDialCode
                  countries={countries}
                  defaultCountry="hk"
                  value={value}
                  onChange={(phone, { country }) => {
                    // const mask = getActiveFormattingMask({ phone, country });
                    onChange(phone);
                  }}
                />
                <InputError>{error?.message}</InputError>
              </>
            )}
            name={"phone"}
            control={updateControl}
            defaultValue={""}
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

export default UpdateExternalPartyButton;
