import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { ReimburseStatus } from '@art-city/common/enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ReimburseEntity } from 'src/database/entities';
import { ReimburseRepository } from 'src/database/repositories';
import { EntityManager, In } from 'typeorm';

@Injectable()
export class ReimburseService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly reimburseRepository: ReimburseRepository,
  ) {}

  async validateAndGetReimburse(reimburseId: string) {
    const reimburse = await this.reimburseRepository.findOne({
      where: {
        id: reimburseId || PLACEHOLDERS.INCORRECT_ID,
      },
    });
    if (!reimburse) {
      throw new NotFoundException(ERROR_CODES.REIMBURSE.REIMBURSE_NOT_FOUND);
    }
  }

  async createReimburseApplication(
    userId: string,
    payload: Partial<ReimburseEntity>,
  ) {
    await this.reimburseRepository.save(
      this.reimburseRepository.create({
        ...payload,
        user: {
          id: userId,
        },
        status: ReimburseStatus.PENDING,
      }),
    );
  }

  async approveOrRejectReimburseApplication(id: string, isApprove: boolean) {
    await this.entityManager.transaction(async (em) => {
      await em.save(ReimburseEntity, {
        status: isApprove ? ReimburseStatus.APPROVED : ReimburseStatus.REJECTED,
        id,
      });
      // TODO: Implement salary calculation
    });
  }

  async validateReimburseStatus(
    reimburseId: string,
    desiredStatuses: ReimburseStatus[],
  ) {
    const reimburse = await this.reimburseRepository.findOne({
      where: {
        id: reimburseId || PLACEHOLDERS.INCORRECT_ID,
        status: In(desiredStatuses),
      },
    });
    if (!reimburse) {
      throw new NotFoundException(
        new ErrorResponseEntity({
          code: ERROR_CODES.REIMBURSE.REIMBURSE_NOT_FOUND,
        }),
      );
    }
  }

  async getReimbursesByUser(
    userId: string,
    filter: Partial<ReimburseEntity> = {},
  ) {
    return await this.reimburseRepository.find({
      where: {
        ...filter,
        user: {
          id: userId,
        },
      },
    });
  }

  async getReimburses(filter: Partial<ReimburseEntity> = {}) {
    return await this.reimburseRepository.find({
      where: {
        ...filter,
      },
    });
  }
}
