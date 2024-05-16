import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetailEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailRepository extends Repository<UserDetailEntity> {
  constructor(
    @InjectRepository(UserDetailEntity)
    protected repository: Repository<UserDetailEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
