"use client";
import { TIMEZONE } from "@art-city/common/constants";
import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import { Text } from "@mantine/core";
import React, { useState } from "react";
import { Unit } from "react-calendar-timeline";

import Scheduler from "@/components/Scheduler";

interface IProps {}

const groups = [
  { id: 1, title: "Jasper" },
  { id: 2, title: "Cindy" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).startOf("date"),
    end_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).endOf("date"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).startOf("date"),
    end_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).endOf("date"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).startOf("date"),
    end_time: DatetimeUtil.moment(undefined, TIMEZONE.HK).endOf("date"),
  },
];

const SchedulerPage: React.FC<IProps> = () => {
  const [unit, setUnit] = useState<Unit>("month");

  const onUnitChange = (unit: Unit) => {
    setUnit(unit);
  };

  return (
    <div>
      {/* <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={DatetimeUtil.moment().add(-12, "hour")}
        defaultTimeEnd={DatetimeUtil.moment().add(12, "hour")}
      /> */}
      {/* <Button.Group>
        <Button variant="default" onClick={() => onChangeUnit("day")}>
          Day
        </Button>
        <Button variant="default" onClick={() => onChangeUnit("month")}>
          Month
        </Button>
        <Button variant="default" onClick={() => onChangeUnit("year")}>
          Year
        </Button>
      </Button.Group> */}
      <Text>{unit}</Text>

      <Scheduler
        unit={unit}
        onUnitChange={onUnitChange}
        groups={groups}
        items={items}
        defaultTimeStart={DatetimeUtil.moment().startOf(unit).toDate()}
        defaultTimeEnd={DatetimeUtil.moment().endOf(unit).toDate()}
        // minZoom={31 * 24 * 60 * 60 * 1000}
      />
    </div>
  );
};

export default SchedulerPage;
