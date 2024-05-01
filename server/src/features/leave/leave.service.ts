import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { LeaveStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import { LeaveRepository } from 'src/database/repositories';
import { LeaveEntity } from 'src/entities';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class LeaveService {
  constructor(private readonly leaveRepo: LeaveRepository) {}

  populateLeaveDays(
    leave: Pick<LeaveEntity, 'from' | 'to'>,
  ): Pick<LeaveEntity, 'from' | 'to' | 'days'> {
    if (!leave.from || !leave.to) {
      throw new Error('Leave from and to date is required');
    }
    const from = DatetimeUtil.moment(leave.from);
    const to = DatetimeUtil.moment(leave.to);
    const days = to.diff(from, 'days') + 1;
    return { ...leave, days };
  }

  async createLeave(userId: string, payload: Partial<LeaveEntity>) {
    await this.leaveRepo.save(
      this.leaveRepo.create({ ...payload, user: { id: userId } }),
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
}
