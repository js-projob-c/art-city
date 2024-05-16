import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/database/entities';
import { EntityManager, Repository } from 'typeorm';

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
    em?: EntityManager,
  ): Promise<AttendanceEntity | null> {
    const manager = em || this.repository.manager;
    return await manager
      .createQueryBuilder(AttendanceEntity, 'attendance')
      .where('attendance.userId = :userId', { userId })
      .andWhere(
        `DATE_TRUNC('day', attendance."signInAt") = DATE_TRUNC('day', :date::timestamp)`,
        { date },
      )
      .getOne();
  }
}
