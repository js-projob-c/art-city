"use client";

import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import Table, { ITableConfig } from "@/components/Table";
import { useSearchUsers } from "@/hooks/features/users/useSearchUsers";

import styles from "./page.module.scss";
import UpdateUserButton from "./UpdateUserButton";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "name",
    label: "名稱",
    isCustom: true,
    renderCustomElement: (value, item) => {
      return <>{[item.firstName, item.lastName].join(" ")}</>;
    },
  },
  { name: "email", label: "電郵" },
  { name: "department", label: "部門" },
  { name: "role", label: "職位" },
  { name: "detail.monthlySalary", label: "基本薪金" },
  { name: "detail.annualLeave", label: "年假" },
];

const LIMIT = 10;

const UserPage: React.FC<IProps> = () => {
  const router = useRouter();
  const { active, setPage } = usePagination({ total: LIMIT, initialPage: 1 });
  const { data, refetch: refetchUsers } = useSearchUsers({
    query: { page: active, limit: 10 },
  });
  const { data: userData = [], pagination } = data ?? {};

  const buttonGroupConfig: ITableConfig = {
    name: "buttonGroup",
    label: "",
    isCustom: true,
    renderCustomElement(value, item) {
      return (
        <Group>
          <UpdateUserButton user={item} onSuccess={refetchUsers} />
          <Tooltip label="查看">
            <ActionIcon
              variant="subtle"
              onClick={() =>
                router.push(`/dashboard/manage/user-attend-details/${item.id}`)
              }
            >
              <IconEye />
            </ActionIcon>
          </Tooltip>
        </Group>
      );
    },
  };

  useEffect(() => {
    if (active === pagination?.page) return;
    refetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className={styles.root}>
      <Table
        data={userData}
        configs={[...configs, buttonGroupConfig]}
        pagination={{
          activePage: active,
          onPageChange: setPage,
          totalPage: pagination?.totalPages ?? 0,
        }}
      />
    </div>
  );
};

export default UserPage;
