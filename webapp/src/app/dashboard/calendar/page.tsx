"use client";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
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

  return (
    <div className={styles.root}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </div>
  );
};

export default SchedulerPage;
