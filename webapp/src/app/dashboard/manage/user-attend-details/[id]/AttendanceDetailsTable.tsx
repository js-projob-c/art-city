import { TIMEZONE } from "@art-city/common/constants";
import { AttendanceStatus } from "@art-city/common/enums";
import { DatetimeUtil } from "@art-city/common/utils";
import { Grid, Text } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

import { useUser } from "@/hooks/features/users/useUser";
import { useUserAttendanceDetails } from "@/hooks/features/users/useUserAttendanceDetails";

import styles from "./AttendanceDetailsTable.module.scss";
interface IProps {
  userId: string;
  month: number;
  year: number;
  scheduleCount: number;
}

const MOMENT = DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK });

const AttendanceDetailsTable: React.FC<IProps> = ({
  userId,
  year = MOMENT.get("year"),
  month = MOMENT.get("month"),
  scheduleCount,
}) => {
  const { data: attendanceDetails, refetch: refetchAttendanceDetails } =
    useUserAttendanceDetails({
      query: { userId, year, month },
    });
  const { data: user, refetch: refetchUser } = useUser({ param: { userId } });

  useDidUpdate(() => {
    refetchAttendanceDetails();
    refetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const renderRowItem = (label: string, value: any, span: number = 12) => {
    const headerSpan = Math.ceil(span / 3);
    const valueSpan = span - headerSpan;

    return (
      <>
        <Grid.Col className={styles.header} span={headerSpan}>
          <Text fw={"bold"} size="sm">
            {label}
          </Text>
        </Grid.Col>
        <Grid.Col span={valueSpan} className={styles.value}>
          <Text size="sm">{value ?? "-"}</Text>
        </Grid.Col>
      </>
    );
  };

  console.log("attendanceDetails", attendanceDetails);

  return (
    <>
      <Grid className={styles.root} p={"md"}>
        {renderRowItem("電郵", user?.email)}
        {renderRowItem("名稱", [user?.firstName, user?.lastName].join(" "), 4)}
        {renderRowItem("部門", user?.department, 4)}
        {renderRowItem("職位", user?.role, 4)}
        {renderRowItem(
          "遲到日數",
          attendanceDetails ? attendanceDetails[AttendanceStatus.LATE] : "-"
        )}
        {renderRowItem(
          "早退日數",
          attendanceDetails
            ? attendanceDetails[AttendanceStatus.LEAVE_EARLY]
            : "-"
        )}
        {renderRowItem(
          "遲到早退日數",
          attendanceDetails
            ? attendanceDetails[AttendanceStatus.LATE_LEAVE_EARLY]
            : "-"
        )}
        {renderRowItem(
          "請假日數",
          attendanceDetails ? attendanceDetails[AttendanceStatus.LEAVE] : "-"
        )}
        {renderRowItem(
          "出勤正常日數",
          attendanceDetails ? attendanceDetails[AttendanceStatus.NORMAL] : "-"
        )}
        {renderRowItem("總排班日數", scheduleCount)}
      </Grid>
    </>
  );
};

export default AttendanceDetailsTable;
