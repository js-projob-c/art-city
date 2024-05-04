import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository extends Repository<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity)
    protected readonly repository: Repository<ScheduleEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
