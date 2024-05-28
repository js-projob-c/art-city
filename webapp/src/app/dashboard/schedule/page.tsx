"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { Flex } from "@mantine/core";
import React from "react";

import styles from "./page.module.scss";

interface IProps {}

const SchedulerPage: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <Flex></Flex>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
};

export default SchedulerPage;
