import { AttendanceStatus } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils';
import { AttendanceEntity } from 'src/database/entities';

import { AttendanceStatusCreator } from './attendanceStatusCreator';

describe('AttendanceStatusCreator', () => {
  describe('createStatus()', () => {
    it('should return AttendanceStatus.NORMAL if signInAt and signOutAt are within work hours', () => {
      // Arrange
      const attendance: Partial<AttendanceEntity> = {
        signInAt: DatetimeUtil.moment('2022-01-01T09:00:00Z').toISOString(),
        signOutAt: DatetimeUtil.moment('2022-01-01T17:00:00Z').toISOString(),
        workHourFrom: '09:00:00',
        workHourTo: '17:00:00',
      };

      // Act
      const result = new AttendanceStatusCreator(
        attendance as AttendanceEntity,
      ).createStatus();

      // Assert
      expect(result).toBe(AttendanceStatus.NORMAL);
    });

    it('should return AttendanceStatus.LATE if signInAt is after workHourFrom', () => {
      // Arrange
      const attendance: Partial<AttendanceEntity> = {
        signInAt: DatetimeUtil.moment('2022-01-01T09:30:00Z').toISOString(),
        signOutAt: DatetimeUtil.moment('2022-01-01T17:00:00Z').toISOString(),
        workHourFrom: '09:00:00',
        workHourTo: '17:00:00',
      };

      // Act
      const result = new AttendanceStatusCreator(
        attendance as AttendanceEntity,
      ).createStatus();

      // Assert
      expect(result).toBe(AttendanceStatus.LATE);
    });

    it('should return AttendanceStatus.LEAVE_EARLY if signOutAt is before workHourTo', () => {
      // Arrange
      const attendance: Partial<AttendanceEntity> = {
        signInAt: DatetimeUtil.moment('2022-01-01 09:00:00.000').toISOString(),
        signOutAt: DatetimeUtil.moment('2022-01-01 16:30:00.000').toISOString(),
        workHourFrom: '09:00:00',
        workHourTo: '17:00:00',
      };

      // Act
      const result = new AttendanceStatusCreator(
        attendance as AttendanceEntity,
      ).createStatus();

      // Assert
      expect(result).toBe(AttendanceStatus.LEAVE_EARLY);
    });

    it('should return AttendanceStatus.LATE_LEAVE_EARLY if signInAt is after workHourFrom and signOutAt is before workHourTo', () => {
      // Arrange
      const attendance: Partial<AttendanceEntity> = {
        signInAt: DatetimeUtil.moment('2022-01-01T09:30:00Z').toISOString(),
        signOutAt: DatetimeUtil.moment('2022-01-01T16:30:00Z').toISOString(),
        workHourFrom: '09:00:00',
        workHourTo: '17:00:00',
      };

      // Act
      const result = new AttendanceStatusCreator(
        attendance as AttendanceEntity,
      ).createStatus();

      // Assert
      expect(result).toBe(AttendanceStatus.LATE_LEAVE_EARLY);
    });

    it('should return null if signOutAt is empty', () => {
      // Arrange
      const attendance: Partial<AttendanceEntity> = {
        signInAt: DatetimeUtil.moment('2022-01-01T09:30:00Z').toISOString(),
        workHourFrom: '09:00:00',
        workHourTo: '17:00:00',
      };

      // Act
      const result = new AttendanceStatusCreator(
        attendance as AttendanceEntity,
      ).createStatus();

      // Assert
      expect(result).toBe(null);
    });
  });
});
