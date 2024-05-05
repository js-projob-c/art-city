import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { ShiftApplicationStatus } from '@art-city/common/enums';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import {
  ScheduleRepository,
  ShiftApplicationRepository,
} from 'src/database/repositories';
import { ScheduleEntity, ShiftApplicationEntity } from 'src/entities';
import { EntityManager, In } from 'typeorm';

@Injectable()
export class ShiftApplicationService {
  constructor(
    private readonly shiftApplicationRepository: ShiftApplicationRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async validateAndGetShiftApplication(shiftApplicationId: string) {
    const data = await this.shiftApplicationRepository.findOne({
      where: { id: shiftApplicationId },
    });
    if (!data) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_APPLICATION_NOT_FOUND,
        }),
      );
    }
    return data;
  }

  async validateShiftFromDateNonExisted(userId: string, date: string) {
    const matchedSchedule = await this.shiftApplicationRepository.findOne({
      where: {
        user: { id: userId },
        fromDate: date,
        status: ShiftApplicationStatus.PENDING,
      },
    });

    if (matchedSchedule) {
      throw new BadRequestException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_FROM_DATE_ALREADY_EXIST,
        }),
      );
    }
  }

  async validateShiftToDateNonExisted(userId: string, date: string) {
    const matchedSchedule = await this.shiftApplicationRepository.findOne({
      where: {
        user: { id: userId },
        toDate: date,
        status: ShiftApplicationStatus.PENDING,
      },
    });

    if (matchedSchedule) {
      throw new BadRequestException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_TO_DATE_ALREADY_EXISTED,
        }),
      );
    }
  }

  async createShiftApplication(
    userId: string,
    payload: Partial<ShiftApplicationEntity>,
  ) {
    return await this.entityManager.transaction(async (em) => {
      const matchedScheduleFrom =
        await this.scheduleRepository.findOneByUserAndDate(
          userId,
          payload.fromDate ?? '',
          em,
        );
      if (!matchedScheduleFrom) {
        throw new NotFoundException(
          new ErrorResponseEntity({
            code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_FROM_DATE_NOT_FOUND,
          }),
        );
      }
      return await em.save(
        ShiftApplicationEntity,
        this.shiftApplicationRepository.create({
          ...payload,
          user: { id: userId },
          status: ShiftApplicationStatus.PENDING,
        }),
      );
    });
  }

  async updateShiftApplication(
    shiftApplicationId: string,
    payload: Partial<ShiftApplicationEntity>,
  ) {
    const shiftApplication = await this.shiftApplicationRepository.findOne({
      where: { id: shiftApplicationId },
    });

    if (!shiftApplication) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_APPLICATION_NOT_FOUND,
        }),
      );
    }
    return await this.shiftApplicationRepository.save({
      id: shiftApplicationId,
      ...payload,
    });
  }

  async approveShiftApplication(
    shiftApplicationId: string,
    isApprove: boolean,
    reviewerId: string,
  ) {
    return await this.entityManager.transaction(async (em) => {
      const shiftApplication = await em.findOne(ShiftApplicationEntity, {
        where: { id: shiftApplicationId },
        relations: ['user'],
      });
      if (!shiftApplication) {
        throw new NotFoundException(
          new ErrorResponseEntity({
            code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_APPLICATION_NOT_FOUND,
          }),
        );
      }
      const matchedScheduleFrom =
        await this.scheduleRepository.findOneByUserAndDate(
          shiftApplication.user.id,
          shiftApplication.fromDate,
          em,
        );
      if (!matchedScheduleFrom) {
        throw new NotFoundException(
          new ErrorResponseEntity({
            code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_FROM_DATE_NOT_FOUND,
          }),
        );
      }
      const matchedScheduleTo =
        await this.scheduleRepository.findOneByUserAndDate(
          shiftApplication.user.id,
          shiftApplication.toDate,
          em,
        );

      if (matchedScheduleTo) {
        throw new NotFoundException(
          new ErrorResponseEntity({
            code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_TO_DATE_ALREADY_EXISTED,
          }),
        );
      }

      if (isApprove) {
        await em.save(ScheduleEntity, {
          id: matchedScheduleFrom.id,
          date: shiftApplication.toDate,
        } as Partial<ScheduleEntity>);
      }

      await em.save(ShiftApplicationEntity, {
        id: shiftApplicationId,
        status: isApprove
          ? ShiftApplicationStatus.APPROVED
          : ShiftApplicationStatus.REJECTED,
        reviewBy: { id: reviewerId },
        reviewedAt: DatetimeUtil.moment().toISOString(),
      });
    });
  }

  async removeShiftApplication(shiftApplicationId: string) {
    const shiftApplication = await this.shiftApplicationRepository.findOne({
      where: { id: shiftApplicationId },
    });

    if (!shiftApplication) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_APPLICATION_NOT_FOUND,
        }),
      );
    }
    return await this.shiftApplicationRepository.softRemove(shiftApplication);
  }

  async validateShiftApplicationStatus(
    shiftApplicationId: string,
    desiredStatuses: ShiftApplicationStatus[],
  ) {
    const application = await this.shiftApplicationRepository.findOne({
      where: {
        id: shiftApplicationId || PLACEHOLDERS.INCORRECT_ID,
        status: In(desiredStatuses),
      },
    });
    if (!application) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.UNMATCH_STATUS,
        }),
      );
    }
  }

  async getShiftApplicationsByUserId(userId: string) {
    return await this.shiftApplicationRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async validateShiftApplicationOwnership(
    shiftApplicationId: string,
    userId: string,
  ) {
    const shiftApplication = await this.shiftApplicationRepository.findOne({
      where: {
        id: shiftApplicationId,
        user: { id: userId },
      },
    });

    if (!shiftApplication) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.SHIFT_APPLICATION.SHIFT_APPLICATION_NOT_FOUND,
        }),
      );
    }
  }

  async deleteShiftApplication(applicationId: string) {
    await this.validateAndGetShiftApplication(applicationId);
    return await this.shiftApplicationRepository.softDelete({
      id: applicationId,
    });
  }
}
