import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ScheduleRepository extends Repository<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity)
    protected readonly repository: Repository<ScheduleEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  /**
   *
   * @param {string} userId
   * @param {string} date YYYY-MM-DD
   * @returns
   */
  async findOneByUserAndDate(
    userId: string,
    date: string,
    em?: EntityManager,
  ): Promise<ScheduleEntity | null> {
    const manager = em || this.repository.manager;
    return await manager
      .createQueryBuilder(ScheduleEntity, 'schedule')
      .where('schedule.userId = :userId', { userId })
      .andWhere(`date = :date`, { date })
      .getOne();
  }
  /**
   *
   * @param {string} userId
   * @param {string[]} dates YYYY-MM-DD
   * @returns
   */
  async findByUserAndDate(
    userId: string,
    dates: string[],
    em?: EntityManager,
  ): Promise<ScheduleEntity[]> {
    const manager = em || this.repository.manager;
    return await manager
      .createQueryBuilder(ScheduleEntity, 'schedule')
      .where('schedule.userId = :userId', { userId })
      .andWhere('schedule.date IN (:...dates)', { dates })
      .getMany();
  }
}
