import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AttendanceModule } from './features/attendance/attendance.module';
import { AuthModule } from './features/auth/auth.module';
import { SystemModule } from './features/system/system.module';
import { UserModule } from './features/user/user.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
