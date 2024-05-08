import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectRepository extends Repository<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity)
    protected repository: Repository<ProjectEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
