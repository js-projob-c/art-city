import { DATETIME_FORMAT, TIMEZONE } from '@art-city/common/constants';
import { AttendanceStatus } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils';
import { AttendanceEntity } from 'src/database/entities';

export class AttendanceStatusCreator {
  constructor(private readonly attendanceEntity: AttendanceEntity) {}

  createStatus(workHourTimezone = TIMEZONE.HK) {
    const { signInAt, signOutAt, workHourFrom, workHourTo } =
      this.attendanceEntity;
    const signInAtMoment = DatetimeUtil.moment(signInAt);
    const signOutAtMoment = DatetimeUtil.moment(signOutAt);
    const workHourFromMoment = DatetimeUtil.moment(
      `${signInAtMoment.tz(workHourTimezone).format(DATETIME_FORMAT.DATE)} ${workHourFrom}`,
      { timezone: workHourTimezone },
    );
    const workHourToMoment = DatetimeUtil.moment(
      `${signOutAtMoment.tz(workHourTimezone).format(DATETIME_FORMAT.DATE)} ${workHourTo}`,
      { timezone: workHourTimezone },
    );
    if (signInAt && !signOutAt) {
      return null;
    }

    if (
      signInAtMoment.isAfter(workHourFromMoment) &&
      signOutAtMoment.isBefore(workHourToMoment)
    ) {
      return AttendanceStatus.LATE_LEAVE_EARLY;
    } else if (signInAtMoment.isAfter(workHourFromMoment)) {
      return AttendanceStatus.LATE;
    } else if (signOutAtMoment.isBefore(workHourToMoment)) {
      return AttendanceStatus.LEAVE_EARLY;
    } else {
      return AttendanceStatus.NORMAL;
    }
  }
}
