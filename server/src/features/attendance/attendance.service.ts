import { DATETIME_FORMAT } from '@art-city/common/constants';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import moment from 'moment-timezone';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import { AttendanceRepository } from 'src/database/repositories';

import { SystemService } from '../system/system.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepo: AttendanceRepository,
    private readonly systemService: SystemService,
    private readonly userService: UserService,
  ) {}

  async signInOrOutByUser(userId: string, date?: moment.MomentInput) {
    await this.userService.validateUserId(userId);
    const currentDateime = DatetimeUtil.moment(date ?? undefined);
    const attendance = await this.attendanceRepo.findOneByUserAndDate(
      userId,
      currentDateime.format(DATETIME_FORMAT.DATE),
    );
    if (!attendance) {
      await this.signInByUser(userId, currentDateime);
    } else {
      await this.signOutByUser(userId, attendance.signInAt);
    }
  }

  async signInByUser(userId: string, date: moment.MomentInput) {
    const system = await this.systemService.getSystem();
    if (!system) throw new InternalServerErrorException('System not found');
    const { workHourFrom, workHourTo } = system;
    const entity = await this.attendanceRepo.save({
      userId,
      signInAt: DatetimeUtil.moment(date).toISOString(),
      workHourFrom,
      workHourTo,
    });
    return entity;
  }

  async signOutByUser(
    userId: string,
    checkInDate: string,
    date: moment.MomentInput = undefined,
  ) {
    const attendance = await this.attendanceRepo.findOneByUserAndDate(
      userId,
      checkInDate,
    );
    if (!attendance) {
      throw new InternalServerErrorException(
        new ErrorResponseEntity({ message: 'Attendance not found' }),
      );
    }
    attendance.signOutAt = DatetimeUtil.moment(date).toISOString();
    await this.attendanceRepo.save(attendance);
    return attendance;
  }
}
