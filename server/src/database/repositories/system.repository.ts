import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SystemRepository extends Repository<SystemEntity> {
  constructor(
    @InjectRepository(SystemEntity)
    protected readonly repository: Repository<SystemEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
