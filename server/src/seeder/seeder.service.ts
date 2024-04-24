import { UserDepartment, UserRole } from '@art-city/common/enums';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
  UserDetailRepository,
  UserRepository,
} from 'src/database/repositories';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepository,
    private readonly userDetailRepo: UserDetailRepository,
  ) {}

  async resetTables() {
    await this.resetTable(this.userRepo);
    await this.resetTable(this.userDetailRepo);
    this.logger.log('Tables reset');
  }

  async seedTables() {
    await this.createUser(
      'admin@gmail.com',
      'Pa33word',
      UserRole.ADMIN,
      UserDepartment.ADMIN,
    );
    await this.createUser(
      'manager@gmail.com',
      'Pa33word',
      UserRole.MANAGER,
      UserDepartment.SALES,
    );
    await this.createUser(
      'employee@gmail.com',
      'Pa33word',
      UserRole.EMPLOYEE,
      UserDepartment.CS,
    );
    this.logger.log('Tables seeded');
  }

  async createUser(
    email: string,
    password: string,
    role: UserRole,
    department: UserDepartment,
  ) {
    const hashedPassword = await this.authService.hashPassword(password);

    await this.userRepo.save(
      this.userRepo.create({
        email: email,
        password: hashedPassword,
        firstName: 'firstName',
        lastName: 'lastName',
        role,
        department,
      }),
    );
  }

  private async resetTable(entity: Repository<any>) {
    await entity?.delete({});
  }
}
