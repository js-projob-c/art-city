import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReimburseEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReimburseRepository extends Repository<ReimburseEntity> {
  constructor(
    @InjectRepository(ReimburseEntity)
    protected repository: Repository<ReimburseEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
