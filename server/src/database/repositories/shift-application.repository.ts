import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShiftApplicationEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ShiftApplicationRepository extends Repository<ShiftApplicationEntity> {
  constructor(
    @InjectRepository(ShiftApplicationEntity)
    protected readonly repository: Repository<ShiftApplicationEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
