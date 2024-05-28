"use client";
import "react-calendar-timeline/lib/Timeline.css";

import { DatetimeUtil } from "@art-city/common/utils/datetime.util";
import React from "react";
import Timeline, {
  CustomHeader,
  DateHeader,
  ReactCalendarTimelineProps,
  SidebarHeader,
  TimelineGroupBase,
  TimelineHeaders,
  TimelineItemBase,
  Unit,
} from "react-calendar-timeline";
import ReactCalendarTimeline from "react-calendar-timeline";

interface IProps {
  unit?: Unit;
  onUnitChange?: (unit: Unit) => void;
}

const Scheduler: React.FC<
  ReactCalendarTimelineProps<TimelineItemBase<any>, TimelineGroupBase> & IProps
> = (props) => {
  const { unit: defaultUnit, onUnitChange, ...rest } = props;
  const [unit, setUnit] = React.useState<Unit>(defaultUnit ?? "month");

  return (
    <div>
      <Timeline
        // traditionalZoom={true}
        onBoundsChange={(ctx) => {
          console.log("ctx", ctx);
        }}
        onZoom={(ctx, unit) => {
          console.log("unit", unit);
          setUnit(unit);
          onUnitChange && onUnitChange(unit);
        }}
        onTimeChange={(a, b, update) => {
          update(
            DatetimeUtil.moment(props.visibleTimeStart).toDate().getTime(),
            DatetimeUtil.moment(props.visibleTimeEnd).toDate().getTime()
          );
        }}
        {...rest}
      >
        <TimelineHeaders>
          {/* <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader> */}
          <DateHeader unit="primaryHeader" />

          {/* <CustomHeader height={50} headerData={{ unit: "weekday" }}>
            {({
              headerContext: { intervals },
              getRootProps,
              getIntervalProps,
              showPeriod,
              data,
            }: any) => {
              return (
                <div {...getRootProps()}>
                  {intervals.map((interval: any, i: number) => {
                    const intervalStyle = {
                      // lineHeight: "30px",
                      textAlign: "center",
                      borderLeft: "1px solid black",
                      // cursor: "pointer",
                      // backgroundColor: "Turquoise",
                      color: "white",
                    };
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          // showPeriod(interval.startTime, interval.endTime);
                        }}
                        {...getIntervalProps({
                          interval,
                          style: intervalStyle,
                        })}
                      >
                        <div className="sticky">
                          {interval.startTime
                            .format("dddd")
                            .substring(0, 3)
                            .toUpperCase()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </CustomHeader> */}

          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
};

export default Scheduler;
