import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { PaginationUtil } from 'src/common/utils/pagination-util';
import { UserDetailEntity, UserEntity } from 'src/database/entities';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserDetailRepository } from 'src/database/repositories/user-detail.repository';
import { EntityManager } from 'typeorm';

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
  ) {
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

    return {
      data: res,
      pagination: PaginationUtil.getPaginationResponse(pagination, total),
    };
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
}
