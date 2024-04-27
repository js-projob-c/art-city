import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserDetailRepository } from 'src/database/repositories/user-detail.repository';
import { UserDetailEntity, UserEntity } from 'src/entities';
import { EntityManager } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    // const res = await this.userRepo.find({
    //   relations: {
    //     detail: true,
    //   },
    // });
    const res = await this.entityManager.find(UserEntity, {
      relations: {
        detail: true,
      },
    });
    // const res = await this.entityManager.transaction(async (em) => {
    //   return em.find(UserEntity, {
    //     relations: {
    //       detail: true,
    //     },
    //   });
    // });
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    // return `This action removes a #${id} user`;
    return await this.userRepo.softDelete({ id });
  }

  async removeDetail(id: string) {
    // return `This action removes a #${id} user`;
    return await this.userDetailRepo.softDelete({ id });
  }
}
