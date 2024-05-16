import {
  DATETIME_FORMAT,
  ERROR_CODES,
  PLACEHOLDERS,
} from '@art-city/common/constants';
import { AttendanceStatus } from '@art-city/common/enums';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import moment from 'moment-timezone';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import { AttendanceRepository } from 'src/database/repositories';
import { AttendanceEntity, UserEntity } from 'src/database/entities';

import { SystemService } from '../system/system.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepo: AttendanceRepository,
    private readonly systemService: SystemService,
    private readonly userService: UserService,
  ) {}

  async updateAttendance(
    attendance_id: string = PLACEHOLDERS.INCORRECT_ID,
    payload: Partial<
      Pick<
        AttendanceEntity,
        'signInAt' | 'signOutAt' | 'supportDocument' | 'remarks'
      >
    >,
  ) {
    const attendance = await this.attendanceRepo.findOne({
      where: { id: attendance_id },
    });

    if (!attendance)
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.ATTENDANCE.ATTENDANCE_NOT_FOUND,
        }),
      );

    const { signInAt, signOutAt, supportDocument, remarks } = payload;

    const mappedAttendance = {
      ...attendance,
      ...(signInAt && { signInAt }),
      ...(signOutAt && { signOutAt }),
      ...(supportDocument && { supportDocument }),
      ...(remarks && { remarks }),
    };

    return await this.attendanceRepo.save(mappedAttendance);
  }

  async signInOrOutByUser(userId: string, date?: moment.MomentInput) {
    const user = await this.userService.validateAndGetUser(userId);
    const currentDateime = DatetimeUtil.moment(date ?? undefined);
    const attendance = await this.attendanceRepo.findOneByUserAndDate(
      user.id,
      currentDateime.format(DATETIME_FORMAT.DATE),
    );
    if (!attendance) {
      await this.signInByUser(user, currentDateime);
    } else {
      await this.signOutByUser(user, attendance.signInAt);
    }
  }

  async signInByUser(user: UserEntity, date: moment.MomentInput) {
    const system = await this.systemService.getSystem();
    if (!system)
      throw new InternalServerErrorException(
        new ErrorResponseEntity({ message: 'System not found' }),
      );
    const { workHourFrom, workHourTo } = system;
    const entity = await this.attendanceRepo.save(
      this.attendanceRepo.create({
        user: user,
        signInAt: DatetimeUtil.moment(date).toISOString(),
        workHourFrom,
        workHourTo,
      }),
    );
    return entity;
  }

  async signOutByUser(
    user: UserEntity,
    checkInDate: string,
    date: moment.MomentInput = undefined,
  ) {
    const attendance = await this.attendanceRepo.findOneByUserAndDate(
      user.id,
      checkInDate,
    );
    if (!attendance) {
      throw new InternalServerErrorException(
        new ErrorResponseEntity({ message: 'Attendance not found' }),
      );
    }
    if (!!attendance.signOutAt) {
      throw new BadRequestException(
        new ErrorResponseEntity({
          code: ERROR_CODES.ATTENDANCE.ALREADY_SIGN_OUT,
        }),
      );
    }
    attendance.signOutAt = DatetimeUtil.moment(date).toISOString();
    await this.attendanceRepo.save(attendance);
    return attendance;
  }

  async getAttendanceByUser(userId: string): Promise<AttendanceEntity[]> {
    const user = await this.userService.validateAndGetUser(userId);
    const attendances = await this.attendanceRepo.find({
      where: { user: { id: user.id } },
    });
    return attendances;
  }

  getAttendanceStatus(attendance: AttendanceEntity) {
    const { signInAt, signOutAt, workHourFrom, workHourTo } = attendance;
    const signInAtMoment = DatetimeUtil.moment(signInAt);
    const signOutAtMoment = DatetimeUtil.moment(signOutAt);
    const workHourFromMoment = DatetimeUtil.moment(
      `${signInAtMoment.format(DATETIME_FORMAT.DATE)} ${workHourFrom}`,
    );
    const workHourToMoment = DatetimeUtil.moment(
      `${signOutAtMoment.format(DATETIME_FORMAT.DATE)} ${workHourTo}`,
    );
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
