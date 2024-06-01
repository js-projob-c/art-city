"use client";

import { DATETIME_FORMAT } from "@art-city/common/constants";
import { CreateShiftApplicationRequestDto } from "@art-city/common/dto/shift-application/create-shift-application-request.dto";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import {
  Button,
  Flex,
  InputError,
  InputLabel,
  Stack,
  TextInput,
} from "@mantine/core";
import { Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { modals } from "@mantine/modals";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import Table, { ITableConfig } from "@/components/Table";
import {
  createShiftApplicationResolver,
  useCreateShiftApplication,
} from "@/hooks/features/shift-applications/useCreateShiftApplication";
import { useShiftApplicationDateOptions } from "@/hooks/features/shift-applications/useShiftApplicationDateOptions";
import { useUserShiftApplications } from "@/hooks/features/shift-applications/useUserShiftApplications";

import styles from "./page.module.scss";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "fromDate",
    label: "原日期",
  },
  {
    name: "toDate",
    label: "調換日期",
  },
  {
    name: "status",
    label: "狀態",
  },
  {
    name: "updatedAt",
    label: "更新日期",
  },
];

const ShiftPage: React.FC<IProps> = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateShiftApplicationRequestDto>({
    resolver: createShiftApplicationResolver,
  });

  const { mutateAsync, isPending } = useCreateShiftApplication();

  const { data: options } = useShiftApplicationDateOptions();
  const { data: shiftApplications, refetch: refetchShiftApplications } =
    useUserShiftApplications();

  const schedulesOptions = useMemo(() => {
    return options
      ?.filter((schedule) => {
        return DatetimeUtil.moment(schedule.date).isAfter(
          DatetimeUtil.moment()
        );
      })
      .map((schedule) => ({
        value: schedule.date,
        label: schedule.date,
      }));
  }, [options]);

  const onApplyShift = async (data: CreateShiftApplicationRequestDto) => {
    await mutateAsync(
      {
        body: {
          fromDate: data.fromDate,
          toDate: data.toDate,
          reason: data.reason,
        },
      },
      {
        async onSuccess(data, variables, context) {
          toast.success("Success");
          modals.close("apply-shift");
          await refetchShiftApplications();
        },
        onError: (error: any) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const onOpenModal = () => {
    modals.openConfirmModal({
      modalId: "apply-shift",
      title: "申請換班",
      centered: true,
      children: (
        <Stack>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                searchable
                required
                label="選擇日期"
                data={schedulesOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"fromDate"}
            control={control}
            defaultValue={undefined}
          />
          <Flex direction={"column"}>
            <Controller
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <InputLabel required>調換日期</InputLabel>
                  <DatePicker
                    value={new Date(value)}
                    onChange={(date: any) =>
                      onChange(
                        DatetimeUtil.moment(date).format(DATETIME_FORMAT.DATE)
                      )
                    }
                    onBlur={onBlur}
                    minDate={new Date()}
                  />
                  <InputError>{error?.message}</InputError>
                </>
              )}
              name={"toDate"}
              control={control}
              defaultValue={undefined}
            />
          </Flex>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="原因"
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"reason"}
            control={control}
            defaultValue={""}
          />
        </Stack>
      ),
      labels: { confirm: "確認", cancel: "取消" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleSubmit(onApplyShift)(),
      closeOnConfirm: false,
      confirmProps: { loading: isPending },
    });
  };

  return (
    <div className={styles.root}>
      <Flex direction={"row-reverse"} mb={50}>
        <Button onClick={onOpenModal}>申請</Button>
      </Flex>
      {shiftApplications && (
        <Table configs={configs} data={shiftApplications} />
      )}
    </div>
  );
};

export default ShiftPage;
