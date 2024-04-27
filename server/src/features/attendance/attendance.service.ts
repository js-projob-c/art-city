import { DATETIME_FORMAT } from '@art-city/common/constants';
import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import { AttendanceRepository } from 'src/database/repositories';

@Injectable()
export class AttendanceService {
  constructor(private attendanceRepo: AttendanceRepository) {}

  async checkInOrOutByUser(userId: string, date?: moment.MomentInput) {
    const currentDateime = DatetimeUtil.moment(date ?? undefined);
    const attendance = await this.attendanceRepo.findOneByUserAndDate(
      userId,
      currentDateime.format(DATETIME_FORMAT.DATE),
    );
    if (!attendance) {
    } else {
      // update existing attendance record
    }
  }

  async checkInByUser(userId: string, date: moment.MomentInput) {
    const entity = this.attendanceRepo.create({
      userId,
      signInAt: DatetimeUtil.moment(date).toISOString(),
    });
  }

  async checkOutByUser(userId: string, date: moment.MomentInput) {}
}
