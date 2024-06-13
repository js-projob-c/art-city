"use client";

import { PLACEHOLDERS } from "@art-city/common/constants";
import { DatetimeUtil } from "@art-city/common/utils";
import { Stack } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Table, { ITableConfig } from "@/components/Table";
import { useSearchAttendances } from "@/hooks/features/attendances/useSearchAttendances";

import AttendanceDetailsTable from "./AttendanceDetailsTable";
import styles from "./page.module.scss";

interface IProps {
  params: { id: string };
}

const LIMIT = 10;

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

const UserDetailsPage: React.FC<IProps> = ({ params }) => {
  const { id: userId } = params;

  const router = useRouter();
  const { active, setPage } = usePagination({ total: LIMIT, initialPage: 1 });

  const [date, setDate] = useState({
    year: DatetimeUtil.moment().get("year"),
    month: DatetimeUtil.moment().get("month"),
  });

  const { data, refetch: refetchAttendances } = useSearchAttendances({
    query: {
      userId: userId || PLACEHOLDERS.INCORRECT_ID,
      page: active,
      limit: 10,
    },
  });
  const { data: attendances = [], pagination } = data ?? {};

  useEffect(() => {
    if (active === pagination?.page) return;
    refetchAttendances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!userId) {
    return <div className={styles.root}>Not found</div>;
  }

  return (
    <div className={styles.root}>
      <Stack>
        <AttendanceDetailsTable
          userId={userId}
          year={date.year}
          month={date.month}
          scheduleCount={pagination?.total ?? 0}
        />
        <Table
          configs={configs}
          data={attendances}
          pagination={{
            activePage: active,
            onPageChange: setPage,
            totalPage: pagination?.totalPages ?? 0,
          }}
        />
      </Stack>
    </div>
  );
};

export default UserDetailsPage;
