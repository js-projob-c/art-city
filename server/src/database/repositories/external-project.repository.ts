import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalProjectEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExternalProjectRepository extends Repository<ExternalProjectEntity> {
  constructor(
    @InjectRepository(ExternalProjectEntity)
    protected repository: Repository<ExternalProjectEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
