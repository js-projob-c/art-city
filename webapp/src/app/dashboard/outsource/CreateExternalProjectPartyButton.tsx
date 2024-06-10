"use client";

import { CreateExternalPartyRequestDto } from "@art-city/common/dto/external-party/create-external-party-request.dto";
import { ExternalPartyType } from "@art-city/common/enums";
import { ExternalProjectStatus } from "@art-city/common/enums/external-project";
import {
  Button,
  Flex,
  InputError,
  InputLabel,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { defaultCountries, parseCountry } from "react-international-phone";

import { toastErrorCode } from "@/common/utils/toast";
import InternationalPhoneInput from "@/components/Forms/InternationalPhoneInput";
import {
  createExternalPartyResolver,
  useCreateExternalParty,
} from "@/hooks/features/external-parties/useCreateExternalParty";

interface IProps {
  onSuccess?: () => void;
}

const CreateExternalProjectPartyButton: React.FC<IProps> = ({ onSuccess }) => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["hk"].includes(iso2);
  });

  const { mutateAsync: createMutateAsync, isPending: isCreatePending } =
    useCreateExternalParty();

  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    formState: { errors },
    reset: createReset,
  } = useForm<CreateExternalPartyRequestDto>({
    resolver: createExternalPartyResolver,
    defaultValues: {
      type: ExternalPartyType.EXTERNAL_PROJECT,
    },
  });

  const onCloseModal = () => {
    closeModal();
    createReset();
  };

  const onSubmitForm = async (data: CreateExternalPartyRequestDto) => {
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
      <Button onClick={openModal}>{"創建外判公司"}</Button>
      <Modal opened={opened} onClose={onCloseModal} title={`創建外判公司`}>
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
            control={createControl}
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
            control={createControl}
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
            control={createControl}
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
                type="email"
              />
            )}
            name={"email"}
            control={createControl}
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
            control={createControl}
            defaultValue={""}
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

export default CreateExternalProjectPartyButton;
