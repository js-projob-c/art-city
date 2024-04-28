import { DATETIME_FORMAT, TIMEZONE } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import { Injectable, Logger } from '@nestjs/common';
import { DatetimeUtil } from 'src/common/utils/datetime.util';
import {
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
    await this.createUser(
      'fb160d84-962f-443e-b3d6-76c1ba353df2',
      'employee@gmail.com',
      'Pa33word',
      UserRole.EMPLOYEE,
      UserDepartment.CS,
    );
    await this.createSystem();
    this.logger.log('Tables seeded');
  }

  async createUser(
    id: string,
    email: string,
    password: string,
    role: UserRole,
    department: UserDepartment,
  ) {
    const hashedPassword = await this.authService.hashPassword(password);

    await this.userRepo.save(
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
  }

  async createSystem() {
    const workHourFromTime = DatetimeUtil.moment(undefined, TIMEZONE.HK)
      .set('hour', 9)
      .set('minute', 0)
      .set('second', 0)
      .tz(TIMEZONE.UTC)
      .format(DATETIME_FORMAT.TIME);
    const workHourToTime = DatetimeUtil.moment(undefined, TIMEZONE.HK)
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
