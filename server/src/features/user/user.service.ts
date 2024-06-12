import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { PaginationResponseDto } from '@art-city/common/dto/pagination/pagination-response.dto';
import { AttendanceStatus } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AttendanceStatusCreator } from 'src/common/class/misc/attendanceStatusCreator';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { PaginationUtil } from 'src/common/utils/pagination-util';
import {
  AttendanceEntity,
  UserDetailEntity,
  UserEntity,
} from 'src/database/entities';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserDetailRepository } from 'src/database/repositories/user-detail.repository';
import { And, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userDetailRepo: UserDetailRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async search(
    filter: Partial<UserEntity> = {},
    pagination: PaginationRequestDto,
  ): Promise<PaginationResponseDto<UserEntity[]>> {
    const [res, total] = await this.userRepo.findAndCount({
      where: { ...filter },
      relations: {
        detail: true,
      },
      order: {
        createdAt: 'DESC',
      },
      ...PaginationUtil.getTypeOrmQuery(pagination),
    });

    return PaginationUtil.getPaginationResponse(res, pagination, total);
  }

  async findAll(filter: Partial<UserEntity> = {}) {
    const res = await this.userRepo.find({
      where: { ...filter },
      relations: {
        detail: true,
      },
    });

    return res;
  }

  async getOneUserById(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: {
        detail: true,
      },
      select: {
        detail: true as any,
      },
    });
    return user;
  }

  async validateAndGetUser(
    id: string = PLACEHOLDERS.INCORRECT_ID,
    em?: EntityManager,
  ): Promise<UserEntity> {
    const manager = em || this.userRepo.manager;
    const user = await manager.findOne(UserEntity, { where: { id } });
    if (!user) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.USER.USER_NOT_FOUND }),
      );
    }
    return user;
  }

  async updateUser(
    userId: string,
    userPayload: Partial<UserEntity>,
    userDetailPayload: Partial<UserDetailEntity>,
  ) {
    await this.entityManager.transaction(async (em: EntityManager) => {
      await this.updateOneUserById(userId, userPayload, em);
      await this.createOrUpdateUserDetails(userId, userDetailPayload, em);
    });
  }

  async updateOneUserById(
    userId: string,
    payload: Partial<UserEntity>,
    em?: EntityManager,
  ) {
    const manager = em || this.userRepo.manager;
    await this.validateAndGetUser(userId, manager);
    await manager.update(UserEntity, { id: userId }, payload);
  }

  async createOrUpdateUserDetails(
    userId: string,
    payload: Partial<UserDetailEntity>,
    em?: EntityManager,
  ) {
    const manager = em || this.userDetailRepo.manager;
    await this.validateAndGetUser(userId, manager);
    const userDetail = await manager.findOne(UserDetailEntity, {
      where: {
        user: {
          id: userId,
        },
      },
    });
    await manager.save(UserDetailEntity, {
      id: userDetail?.id,
      user: {
        id: userId,
      },
      ...payload,
    });
  }

  async getAttendanceDetails(
    userId: string,
    year: number = DatetimeUtil.moment().get('year'),
    month: number = DatetimeUtil.moment().get('month'),
  ): Promise<Record<keyof typeof AttendanceStatus, number>> {
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
    const result = await this.entityManager.transaction(
      async (em: EntityManager) => {
        await this.validateAndGetUser(userId, em);
        const attendances = await em.find(AttendanceEntity, {
          where: {
            user: {
              id: userId,
            },
            signOutAt: And(MoreThanOrEqual(fromDate), LessThanOrEqual(toDate)),
          } as any,
        });
        const initialValue = Object.values(AttendanceStatus).reduce(
          (acc, status) => ({ ...acc, [status]: 0 }),
          {} as Record<keyof typeof AttendanceStatus, number>,
        );
        return attendances.reduce((acc, cur) => {
          const status = new AttendanceStatusCreator(cur).createStatus();
          if (!status) return acc;
          const prev = acc[status] ?? 0;
          return { ...acc, [status]: prev + 1 };
        }, initialValue);
      },
    );

    return result;
  }
}
