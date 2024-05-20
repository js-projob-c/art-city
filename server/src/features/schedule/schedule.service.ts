import { ERROR_CODES } from '@art-city/common/constants';
import { PromiseRunner } from '@art-city/common/utils/promise-runner.util';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ErrorResponseEntity } from 'src/common/exceptions/ErrorResponseEntity';
import { ScheduleEntity } from 'src/database/entities';
import { ScheduleRepository } from 'src/database/repositories';
import { EntityManager } from 'typeorm';

@Injectable()
export class ScheduleService {
  private readonly logger: Logger = new Logger(ScheduleService.name);

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly entityManager: EntityManager,
  ) {}

  async createSchedule(userId: string, date: string) {
    const existRecord = await this.scheduleRepository.findOneByUserAndDate(
      userId,
      date,
    );
    if (existRecord)
      throw new BadRequestException({
        error: ERROR_CODES.SCHEDULE.SCHEDULE_ALREADY_EXISTED,
      });
    return await this.scheduleRepository.save(
      this.scheduleRepository.create({ user: { id: userId }, date }),
    );
  }

  async batchCreateSchedule(
    userId: string,
    dates: string[],
  ): Promise<ScheduleEntity> {
    return await this.entityManager.transaction(async (em) => {
      const existRecords = await this.scheduleRepository.findByUserAndDate(
        userId,
        dates,
        em,
      );
      if (existRecords?.length > 0) {
        throw new BadRequestException(
          new ErrorResponseEntity({
            code: ERROR_CODES.SCHEDULE.SCHEDULE_ALREADY_EXISTED,
            data: existRecords.map((record) => record.date),
          }),
        );
      }

      const promiseRunner = new PromiseRunner();
      dates.forEach((date) => {
        promiseRunner.add(async () => {
          return await em.save(
            ScheduleEntity,
            this.scheduleRepository.create({ user: { id: userId }, date }),
          );
        });
      });

      return await promiseRunner.run();
    });
  }

  async updateSchedule(scheduleId: string, payload: Partial<ScheduleEntity>) {
    return await this.scheduleRepository.save({
      ...payload,
      id: scheduleId,
    });
  }

  async getSchedules(userId: string) {
    return await this.scheduleRepository.find({
      where: { user: { id: userId } },
    });
  }
}
