import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetailEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailRepository extends Repository<UserDetailEntity> {
  constructor(
    @InjectRepository(UserDetailEntity)
    private repository: Repository<UserDetailEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
