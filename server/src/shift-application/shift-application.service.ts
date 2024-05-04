import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { ShiftApplicationStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ShiftApplicationRepository } from 'src/database/repositories';
import { ShiftApplicationEntity } from 'src/entities';
import { In } from 'typeorm';

@Injectable()
export class ShiftApplicationService {
  constructor(
    private readonly shiftApplicationRepository: ShiftApplicationRepository,
  ) {}

  async createShiftApplication(
    userId: string,
    payload: Partial<ShiftApplicationEntity>,
  ) {
    return await this.shiftApplicationRepository.save(
      this.shiftApplicationRepository.create({
        ...payload,
        user: { id: userId },
        status: ShiftApplicationStatus.PENDING,
      }),
    );
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

    // TODO: update schedules
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
}
