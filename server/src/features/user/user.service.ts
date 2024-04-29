import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserDetailRepository } from 'src/database/repositories/user-detail.repository';
import { UserDetailEntity, UserEntity } from 'src/entities';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private userDetailRepo: UserDetailRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll() {
    const res = await this.entityManager.find(UserEntity, {
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
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.USER.USER_NOT_FOUND }),
      );
    }
    return user;
  }

  async updateOneUserById(userId: string, payload: Partial<UserEntity>) {
    await this.validateAndGetUser(userId);
    await this.userRepo.update({ id: userId }, payload);
    return await this.getOneUserById(userId);
  }

  async createOrUpdateUserDetails(
    userId: string,
    payload: Partial<UserDetailEntity>,
  ) {
    await this.validateAndGetUser(userId);
    const userDetail = await this.userDetailRepo.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    await this.userDetailRepo.save({
      id: userDetail?.id,
      user: {
        id: userId,
      },
      ...payload,
    });
  }
}
