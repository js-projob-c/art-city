"use client";

import { DATETIME_FORMAT, TIMEZONE } from "@art-city/common/constants";
import { CreateLeaveRequestDto } from "@art-city/common/dto/leave/createLeaveRequest.dto";
import { LeaveDayType, LeaveType } from "@art-city/common/enums";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import {
  Button,
  Flex,
  InputError,
  InputLabel,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { Select } from "@mantine/core";
import { DatePicker, DatesRangeValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import React, { useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { toastErrorCode } from "@/common/utils/toast";
import Table, { ITableConfig } from "@/components/Table";
import {
  createLeaveRequestResolver,
  useApplyLeave,
} from "@/hooks/features/leave/useApplyLeave";
import { useSearchLeaves } from "@/hooks/features/leave/useSearchLeaves";

import styles from "./page.module.scss";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "from",
    label: "由",
    transform: (value, obj) => {
      return `${value} (${obj.fromDayType})`;
    },
  },
  {
    name: "to",
    label: "至",
    transform(value, item) {
      return `${value} (${item.toDayType})`;
    },
  },
  {
    name: "days",
    label: "日數",
  },
  {
    name: "reason",
    label: "原因",
  },
  {
    name: "type",
    label: "種類",
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

const leaveTypeOptions = Object.values(LeaveType).map((type) => ({
  value: type,
  label: type,
}));

const leaveDayTypeOptions = Object.values(LeaveDayType).map((type) => ({
  value: type,
  label: type,
}));

const fromLeaveDayTypeOptions = leaveDayTypeOptions.filter(
  (option) => option.value !== LeaveDayType.HALF_AM
);

const toLeaveDayTypeOptions = leaveDayTypeOptions.filter(
  (option) => option.value !== LeaveDayType.HALF_PM
);

const LeavePage: React.FC<IProps> = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateLeaveRequestDto>({
    resolver: createLeaveRequestResolver,
  });

  const watchValues = useWatch({
    control,
  });

  const { mutateAsync, isPending } = useApplyLeave();
  const { data, refetch: refetchLeaves } = useSearchLeaves({
    query: {
      // year: DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK }).year(),
      // month:
      //   DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK }).month() + 1,
    },
  });
  const { data: leaves = [] } = data ?? {};

  console.log("leaves", leaves);

  const onApplyLeave = async (data: CreateLeaveRequestDto) => {
    console.log("data", data);
    await mutateAsync(
      {
        body: {
          type: data.type,
          from: data.from,
          to: data.to,
          fromDayType: data.fromDayType,
          toDayType: data.toDayType,
          reason: data.reason,
        },
      },
      {
        async onSuccess(data, variables, context) {
          toast.success("成功");
          closeModal();
          await refetchLeaves();
        },
        onError: (error: any) => {
          toastErrorCode(error);
        },
      }
    );
  };

  const onDurationChange = useCallback(
    ([from, to]: DatesRangeValue) => {
      const [fromDate, toDate] = [from, to].map((date) => {
        return date
          ? DatetimeUtil.moment(date, {
              timezone: TIMEZONE.HK,
            }).format(DATETIME_FORMAT.DATE)
          : "";
      });
      setValue("from", fromDate);
      setValue("to", toDate || fromDate);
    },
    [setValue]
  );

  const onDurationTypeChange = useCallback(
    ({ fromType, toType }: { fromType?: string; toType?: string }) => {
      console.log("{ fromType, toType }", { fromType, toType });
      const leaveDayTypes = Object.values(LeaveDayType);
      const matchFromType = leaveDayTypes.find((type) => type === fromType);
      const matchToType = leaveDayTypes.find((type) => type === toType);
      if (matchFromType) {
        setValue("fromDayType", matchFromType);
      }
      if (matchToType) {
        setValue("toDayType", matchToType);
      }
    },
    [setValue]
  );

  const renderDurationTypeSelector = () => {
    const isMultiple =
      !!watchValues.from &&
      !!watchValues.to &&
      watchValues.from !== watchValues.to;

    return isMultiple ? (
      <Flex gap={"sm"}>
        <Select
          required
          label="休假種類"
          data={fromLeaveDayTypeOptions}
          value={watchValues.fromDayType}
          onChange={(fromType: string | null) =>
            onDurationTypeChange({ fromType: fromType ?? undefined })
          }
          error={errors["fromDayType"]?.message}
        />
        <Select
          required
          label="休假種類"
          data={toLeaveDayTypeOptions}
          value={watchValues.toDayType}
          onChange={(toType: string | null) =>
            onDurationTypeChange({ toType: toType ?? undefined })
          }
          error={errors["toDayType"]?.message}
        />
      </Flex>
    ) : (
      <Select
        required
        label="休假種類"
        data={leaveDayTypeOptions}
        value={watchValues.fromDayType || watchValues.toDayType}
        onChange={(dayType: string | null) => {
          onDurationTypeChange({
            fromType: dayType ?? undefined,
            toType: dayType ?? undefined,
          });
        }}
        error={errors["fromDayType"]?.message || errors["toDayType"]?.message}
      />
    );
  };

  const onOpenModal = () => {
    openModal();
  };

  return (
    <>
      <div className={styles.root}>
        <Flex direction={"row-reverse"} mb={50}>
          <Button onClick={onOpenModal}>申請</Button>
        </Flex>
        <Table configs={configs} data={leaves} />
      </div>
      <Modal opened={opened} onClose={closeModal} title="申請休假">
        <Stack gap={"lg"}>
          <Controller
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                required
                label="休假種類"
                data={leaveTypeOptions}
                onBlur={onBlur}
                error={error?.message}
                onChange={onChange}
                value={value}
              />
            )}
            name={"type"}
            control={control}
            defaultValue={undefined}
          />
          <Flex direction={"column"}>
            <>
              <InputLabel required>休假日期</InputLabel>
              <DatePicker type="range" onChange={onDurationChange} />
              <InputError>{errors["from"]?.message}</InputError>
              <InputError>{errors["to"]?.message}</InputError>
            </>
          </Flex>
          {renderDurationTypeSelector()}
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
          <Flex gap={"md"} justify={"flex-end"}>
            <Button variant="outline" onClick={closeModal} loading={isPending}>
              Cancel
            </Button>
            <Button onClick={handleSubmit(onApplyLeave)} loading={isPending}>
              Confirm
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default LeavePage;
