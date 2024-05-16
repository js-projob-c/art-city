import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveRepository extends Repository<LeaveEntity> {
  constructor(
    @InjectRepository(LeaveEntity)
    protected repository: Repository<LeaveEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
