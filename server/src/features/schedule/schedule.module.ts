import { Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';

import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [UserModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
