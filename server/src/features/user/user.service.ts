import { ERROR_CODES, PLACEHOLDERS } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserDetailRepository } from 'src/database/repositories/user-detail.repository';
import { UserDetailEntity, UserEntity } from 'src/entities';
import { EntityManager } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private userDetailRepo: UserDetailRepository,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const detail = new UserDetailEntity();

    detail.monthlySalary = 12;
    detail.annualLeave = 12;

    const res = await this.userRepo.save(createUserDto);
    console.log('resresres', res);
    detail.user = res;
    const res2 = await this.userDetailRepo.save(detail);
    return res2;
  }

  async findAll() {
    const res = await this.entityManager.find(UserEntity, {
      relations: {
        detail: true,
      },
    });

    return res;
  }

  async validateUserId(id: string = PLACEHOLDERS.INCORRECT_ID) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        new ErrorResponseEntity({ code: ERROR_CODES.USER.USER_NOT_FOUND }),
      );
    }
  }
}
