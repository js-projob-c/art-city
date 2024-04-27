import { Module } from '@nestjs/common';

import { SystemModule } from '../system/system.module';
import { UserModule } from '../user/user.module';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [SystemModule, UserModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
