import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceRepository extends Repository<AttendanceEntity> {
  constructor(
    @InjectRepository(AttendanceEntity)
    protected readonly repository: Repository<AttendanceEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
