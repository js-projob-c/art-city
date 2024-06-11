"use client";

import { TIMEZONE } from "@art-city/common/constants";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

import Table, { ITableConfig } from "@/components/Table";
import {
  IAttendance,
  useAttendances,
} from "@/hooks/features/attendances/useAttendances";
import { useSignInOrOut } from "@/hooks/features/attendances/useSignInOrOut";
import { useGetWorkingHours } from "@/hooks/features/system/useWorkingHours";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "signInAt",
    label: "簽到時間",
  },
  {
    name: "signOutAt",
    label: "簽出時間",
  },
  {
    name: "status",
    label: "狀態",
  },
  {
    name: "supportDocument",
    label: "支援文件",
  },
  {
    name: "remarks",
    label: "備註",
  },
];

const SigningPage: React.FC<IProps> = () => {
  const { mutateAsync, isPending: isSigning } = useSignInOrOut();
  const { data = [], refetch, isLoading } = useAttendances();
  const { data: workingHoursData } = useGetWorkingHours();

  const onSignInOrOut = useCallback(async () => {
    mutateAsync(
      {},
      {
        async onSuccess(data) {
          console.log("data", data);
          toast.success("成功");
          await refetch();
        },
        onError(error) {
          console.error(error);
          toast.error("失敗");
        },
      }
    );
  }, [mutateAsync, refetch]);

  const renderSignButton = useCallback(() => {
    const sortedData = data?.sort((a: IAttendance, b: IAttendance) => {
      if (!a.signInAt || !b.signInAt) return 0;
      return new Date(b.signInAt).getTime() - new Date(a.signInAt).getTime();
    });
    const latestAttendance = sortedData?.[0];
    if (latestAttendance?.signInAt && latestAttendance?.signOutAt) {
      return (
        <Button variant="outline" disabled>
          已簽到
        </Button>
      );
    } else if (latestAttendance?.signInAt && !latestAttendance?.signOutAt) {
      return (
        <Button
          variant="outline"
          onClick={onSignInOrOut}
          disabled={isLoading}
          loading={isSigning}
        >
          簽出
        </Button>
      );
    } else if (!latestAttendance?.signInAt && !latestAttendance?.signOutAt) {
      return (
        <Button
          variant="outline"
          onClick={onSignInOrOut}
          disabled={isLoading}
          loading={isSigning}
        >
          簽到
        </Button>
      );
    }
  }, [data, onSignInOrOut, isLoading, isSigning]);

  return (
    <>
      <Stack>
        <Flex w={"100%"} justify={"space-between"} align={"center"}>
          <Stack>
            <Text>
              上班時間:{" "}
              {workingHoursData?.workHourFrom
                ? DatetimeUtil.moment(workingHoursData?.workHourFrom, {
                    timezone: TIMEZONE.UTC,
                    format: "HH:mm:ss",
                  })
                    .tz(TIMEZONE.HK)
                    .format("HH:mm")
                : "-"}
            </Text>
            <Text>
              下班時間:{" "}
              {workingHoursData?.workHourTo
                ? DatetimeUtil.moment(workingHoursData?.workHourTo, {
                    timezone: TIMEZONE.UTC,
                    format: "HH:mm:ss",
                  })
                    .tz(TIMEZONE.HK)
                    .format("HH:mm")
                : "-"}
            </Text>
          </Stack>
          {renderSignButton()}
        </Flex>
        <Box>
          <Table configs={configs} data={data} />
        </Box>
      </Stack>
    </>
  );
};

export default SigningPage;
