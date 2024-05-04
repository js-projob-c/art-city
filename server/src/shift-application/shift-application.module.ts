import { Module } from '@nestjs/common';

import { ShiftApplicationController } from './shift-application.controller';
import { ShiftApplicationService } from './shift-application.service';

@Module({
  controllers: [ShiftApplicationController],
  providers: [ShiftApplicationService],
})
export class ShiftApplicationModule {}
