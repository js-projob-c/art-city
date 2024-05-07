import { Module } from '@nestjs/common';

import { ReimburseController } from './reimburse.controller';
import { ReimburseService } from './reimburse.service';

@Module({
  controllers: [ReimburseController],
  providers: [ReimburseService],
})
export class ReimburseModule {}
