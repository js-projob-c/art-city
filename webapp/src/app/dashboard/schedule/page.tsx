"use client";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useMemo } from "react";

import { useUserSchedules } from "@/hooks/features/schedules/useUserSchedules";

import styles from "./page.module.scss";

interface IProps {}

const SchedulerPage: React.FC<IProps> = () => {
  const { data: scheduleData = [] } = useUserSchedules();

  const calendarEvents = useMemo(() => {
    const events: EventSourceInput = scheduleData.map((schedule) => ({
      title: "排班",
      date: schedule.date,
      display: "background",
    }));
    return events;
  }, [scheduleData]);

  const onOpenModal = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      closeOnConfirm: false,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => onOpenModal(),
    });
  };

  return (
    <div className={styles.root}>
      <Flex direction={"row-reverse"} mb={50}>
        <Button onClick={onOpenModal}>申請</Button>
      </Flex>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </div>
  );
};

export default SchedulerPage;
