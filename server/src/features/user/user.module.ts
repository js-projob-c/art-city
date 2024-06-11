import { forwardRef, Module } from '@nestjs/common';

import { AttendanceModule } from '../attendance/attendance.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AttendanceModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
