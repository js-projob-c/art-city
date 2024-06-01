import { DATETIME_FORMAT, TIMEZONE } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import { DatetimeUtil } from '@art-city/common/utils/datetime.util';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from 'src/database/entities';
import {
  ScheduleRepository,
  SystemRepository,
  UserDetailRepository,
  UserRepository,
} from 'src/database/repositories';
import { AuthService } from 'src/features/auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
    private readonly userDetailRepo: UserDetailRepository,
    private readonly systemRepo: SystemRepository,
    private readonly scheduleRepo: ScheduleRepository,
  ) {}

  async resetTables() {
    await this.resetTable(this.userRepo);
    await this.resetTable(this.userDetailRepo);
    await this.resetTable(this.systemRepo);
    this.logger.log('Tables reset');
  }

  async seedTables() {
    await this.createUser(
      '0c7870f7-1f8e-47c5-9db6-80010cad5487',
      'admin@gmail.com',
      'Pa33word',
      UserRole.ADMIN,
      UserDepartment.ADMIN,
    );
    await this.createUser(
      '4bf8ea5f-1638-4260-954e-7c5979df57e6',
      'manager@gmail.com',
      'Pa33word',
      UserRole.MANAGER,
      UserDepartment.SALES,
    );
    const employee = await this.createUser(
      'fb160d84-962f-443e-b3d6-76c1ba353df2',
      'employee@gmail.com',
      'Pa33word',
      UserRole.EMPLOYEE,
      UserDepartment.CS,
    );
    if (employee?.id) {
      await this.createSchedules(employee.id);
    }
    await this.createSystem();
    this.logger.log('Tables seeded');
  }

  async createSchedules(userId: string) {
    const startDate = DatetimeUtil.moment('2024-01-01', {
      timezone: TIMEZONE.HK,
      format: DATETIME_FORMAT.DATE,
    });
    while (
      startDate.isBefore(
        DatetimeUtil.moment(undefined, { timezone: TIMEZONE.HK }).endOf('year'),
      )
    ) {
      const exist = await this.scheduleRepo.findOne({
        where: {
          user: { id: userId },
          date: startDate.format(DATETIME_FORMAT.DATE),
        },
      });
      if (!exist && startDate.day() !== 0 && startDate.day() !== 6) {
        await this.scheduleRepo.save(
          this.scheduleRepo.create({
            user: { id: userId },
            date: startDate.format(DATETIME_FORMAT.DATE),
          }),
        );
      }
      startDate.add(1, 'days');
    }
  }

  async createUser(
    id: string,
    email: string,
    password: string,
    role: UserRole,
    department: UserDepartment,
  ): Promise<UserEntity | undefined> {
    const hashedPassword = await this.authService.hashPassword(password);
    const existed = await this.userRepo.findOne({ where: { email } });
    if (existed) return;
    const user = await this.userRepo.save(
      this.userRepo.create({
        id,
        email: email,
        password: hashedPassword,
        firstName: 'firstName',
        lastName: 'lastName',
        role,
        department,
      }),
    );
    return user;
  }

  async createSystem() {
    const workHourFromTime = DatetimeUtil.moment(undefined, {
      timezone: TIMEZONE.HK,
    })
      .set('hour', 9)
      .set('minute', 0)
      .set('second', 0)
      .tz(TIMEZONE.UTC)
      .format(DATETIME_FORMAT.TIME);
    const workHourToTime = DatetimeUtil.moment(undefined, {
      timezone: TIMEZONE.HK,
    })
      .set('hour', 18)
      .set('minute', 0)
      .set('second', 0)
      .tz(TIMEZONE.UTC)
      .format(DATETIME_FORMAT.TIME);
    await this.systemRepo.save(
      this.systemRepo.create({
        workHourFrom: workHourFromTime,
        workHourTo: workHourToTime,
      }),
    );
  }

  private async resetTable(entity: Repository<any>) {
    await entity?.delete({});
  }
}
