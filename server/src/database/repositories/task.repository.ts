import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    protected repository: Repository<TaskEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
