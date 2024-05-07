import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [AwsModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
