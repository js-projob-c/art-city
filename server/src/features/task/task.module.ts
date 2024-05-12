import { Module } from '@nestjs/common';

import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [UserModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
