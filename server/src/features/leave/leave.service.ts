import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { LeaveStatus } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils/datetime.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { LeaveEntity } from 'src/database/entities';
import { LeaveRepository } from 'src/database/repositories';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class LeaveService {
  constructor(private readonly leaveRepo: LeaveRepository) {}

  populateLeaveDays(
    leave: Pick<LeaveEntity, 'from' | 'to' | 'fromDayType' | 'toDayType'>,
  ): Pick<LeaveEntity, 'from' | 'to' | 'days'> {
    if (!leave.from || !leave.to) {
      throw new Error('Leave from and to date is required');
    }
    if (!leave.fromDayType || !leave.toDayType) {
      throw new Error('Leave from and to day type is required');
    }
    const from = DatetimeUtil.moment(leave.from);
    const to = DatetimeUtil.moment(leave.to);
    const dateRange = DatetimeUtil.generateDateRange(from, to);
    let numberOfDays = 0;
    dateRange.forEach((date) => {
      if (DatetimeUtil.isWeekend(date)) {
        return;
      }
      numberOfDays += 1;
    });

    const isFromHalfDay =
      leave.fromDayType === 'HALF_AM' || leave.fromDayType === 'HALF_PM';
    const isToHalfDay =
      leave.toDayType === 'HALF_AM' || leave.toDayType === 'HALF_PM';

    if (leave.from === leave.to) {
      if (isFromHalfDay && isToHalfDay) {
        numberOfDays -= 0.5;
      }
    } else {
      if (leave.fromDayType === 'HALF_AM' || leave.fromDayType === 'HALF_PM') {
        numberOfDays -= 0.5;
      }
      if (leave.toDayType === 'HALF_AM' || leave.toDayType === 'HALF_PM') {
        numberOfDays -= 0.5;
      }
    }

    return { ...leave, days: numberOfDays };
  }

  async createLeave(userId: string, payload: Partial<LeaveEntity>) {
    await this.leaveRepo.save(
      this.leaveRepo.create({
        ...payload,
        user: { id: userId },
        status: LeaveStatus.PENDING,
      }),
    );
  }

  async updateLeave(leaveId: string, payload: Partial<LeaveEntity>) {
    const leave = await this.validateAndGetLeave(leaveId);
    await this.leaveRepo.save({ ...leave, ...payload });
  }

  async approveOrRejectLeaveApplication(leaveId: string, isApprove: boolean) {
    await this.leaveRepo.save({
      id: leaveId,
      status: isApprove ? LeaveStatus.APPROVED : LeaveStatus.CANCELLED,
    });
  }

  async getLeavesByUserId(
    userId: string,
    year: number = DatetimeUtil.moment().get('year'),
    month: number = DatetimeUtil.moment().get('month'),
  ) {
    const fromDate = DatetimeUtil.moment()
      .set('year', year)
      .set('month', month)
      .startOf('month')
      .toDate();
    const toDate = DatetimeUtil.moment()
      .set('year', year)
      .set('month', month)
      .endOf('month')
      .toDate();

    return await this.leaveRepo.find({
      where: {
        user: {
          id: userId,
        },
        from: MoreThanOrEqual(fromDate),
        to: LessThanOrEqual(toDate),
      } as any,
    });
  }

  async validateLeaveStatus(leaveId: string, desiredStatuses: LeaveStatus[]) {
    const leave = await this.leaveRepo.findOne({
      where: {
        id: leaveId || PLACEHOLDERS.INCORRECT_ID,
        status: In(desiredStatuses),
      },
    });
    if (!leave) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.LEAVE.UNMATCH_STATUS }),
      );
    }
  }

  async validateAndGetLeave(leaveId: string) {
    const leave = await this.leaveRepo.findOne({
      where: {
        id: leaveId || PLACEHOLDERS.INCORRECT_ID,
      },
    });
    if (!leave) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.LEAVE.LEAVE_NOT_FOUND }),
      );
    }
    return leave;
  }

  async getUserTotalLeaveDays(userId: string, year: number): Promise<number> {
    const query = `
        SELECT sum(days) as days
        FROM leave
        WHERE "userId" = $1
        AND date_trunc('year', "from") = to_timestamp($2::text, 'YYYY')
        AND date_trunc('year', "to") = to_timestamp($2::text, 'YYYY')
    `;
    const leaves = await this.leaveRepo.query(query, [userId, year]);
    const numOfDays = leaves[0]?.days || 0;
    return numOfDays;
  }
}
