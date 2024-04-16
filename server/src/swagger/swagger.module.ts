import { Module } from '@nestjs/common';

import { SwaggerConfig } from './swagger.config';
import { SwaggerService } from './swagger.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SwaggerService, SwaggerConfig],
})
export class SwaggerModule {}
