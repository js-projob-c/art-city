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

  async findOneByUserAndDate(
    userId: string,
    date: string,
  ): Promise<AttendanceEntity | null> {
    return await this.repository
      .createQueryBuilder('attendance')
      .where('attendance.userId = :userId', { userId })
      .andWhere(
        "DATE_TRUNC('day', attendance.date) = DATE_TRUNC('day', :date)",
        { date },
      )
      .getOne();
  }
}
