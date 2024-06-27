"use client";

import { LeaveStatus } from "@art-city/common/enums";
import { Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

import Table, { ITableConfig } from "@/components/Table";
import { useSearchLeaves } from "@/hooks/features/leave/useSearchLeaves";

import ApproveOrRejectLeaveButton from "./ApproveOrRejectLeaveButton";
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

const LeavePage: React.FC<IProps> = () => {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const { data, refetch: refetchLeaves } = useSearchLeaves({
    query: {
      // year: DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK }).year(),
      // month:
      //   DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK }).month() + 1,
    },
  });
  const { data: leaves = [] } = data ?? {};

  console.log("leaves", leaves);

  const buttonGroupConfig: ITableConfig = {
    name: "buttonGroup",
    label: "",
    isCustom: true,
    renderCustomElement(value, item) {
      if (item.status !== LeaveStatus.PENDING) return <></>;
      return (
        <Group>
          <ApproveOrRejectLeaveButton leave={item} onSuccess={refetchLeaves} />
        </Group>
      );
    },
  };

  return (
    <>
      <div className={styles.root}>
        <Table configs={[...configs, buttonGroupConfig]} data={leaves} />
      </div>
      <Modal opened={opened} onClose={closeModal} title="申請休假"></Modal>
    </>
  );
};

export default LeavePage;
