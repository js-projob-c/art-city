import { Module } from '@nestjs/common';
import { UserModule } from 'src/features/user/user.module';

import { ShiftApplicationController } from './shift-application.controller';
import { ShiftApplicationService } from './shift-application.service';

@Module({
  imports: [UserModule],
  controllers: [ShiftApplicationController],
  providers: [ShiftApplicationService],
})
export class ShiftApplicationModule {}
