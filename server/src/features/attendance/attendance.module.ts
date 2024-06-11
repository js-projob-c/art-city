import { forwardRef, Module } from '@nestjs/common';

import { SystemModule } from '../system/system.module';
import { UserModule } from '../user/user.module';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [SystemModule, forwardRef(() => UserModule)],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
