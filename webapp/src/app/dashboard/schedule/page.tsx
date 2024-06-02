"use client";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import React, { useMemo } from "react";

import Table, { ITableConfig } from "@/components/Table";
import { useSchedules } from "@/hooks/features/schedules/useSchedules";

import styles from "./page.module.scss";

interface IProps {}

const configs: ITableConfig[] = [
  {
    name: "date",
    label: "日期",
  },
];

const SchedulerPage: React.FC<IProps> = () => {
  const { data: scheduleData = [] } = useSchedules();

  const calendarEvents = useMemo(() => {
    const events: EventSourceInput = scheduleData.map((schedule) => ({
      title: "排班",
      date: schedule.date,
      display: "background",
    }));
    return events;
  }, [scheduleData]);

  return (
    <div className={styles.root}>
      <Table data={scheduleData} configs={configs} />
    </div>
  );
};

export default SchedulerPage;
