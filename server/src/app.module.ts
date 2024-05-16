import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import { DatabaseModule } from './database/database.module';
import { AttendanceModule } from './features/attendance/attendance.module';
import { AuthModule } from './features/auth/auth.module';
import { BankModule } from './features/bank/bank.module';
import { ExternalPartyModule } from './features/external-party/external-party.module';
import { ExternalProjectModule } from './features/external-project/external-project.module';
import { LeaveModule } from './features/leave/leave.module';
import { ProjectModule } from './features/project/project.module';
import { PurchaseModule } from './features/purchase/purchase.module';
import { ReimburseModule } from './features/reimburse/reimburse.module';
import { ScheduleModule } from './features/schedule/schedule.module';
import { ShiftApplicationModule } from './features/shift-application/shift-application.module';
import { SystemModule } from './features/system/system.module';
import { TaskModule } from './features/task/task.module';
import { UserModule } from './features/user/user.module';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { SeederModule } from './seeder/seeder.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    AuthModule,
    SwaggerModule,
    HealthModule,
    SeederModule,
    SystemModule,
    AttendanceModule,
    FilesModule,
    LeaveModule,
    ShiftApplicationModule,
    ScheduleModule,
    BankModule,
    ReimburseModule,
    AwsModule,
    ExternalPartyModule,
    ProjectModule,
    TaskModule,
    PurchaseModule,
    ExternalProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
