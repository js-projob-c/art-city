import { Injectable, Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { SwaggerConfig } from './swagger.config';

@Injectable()
export class SwaggerService {
  private readonly logger: Logger = new Logger(SwaggerService.name);
  private swaggerPath = 'swagger';

  constructor(private readonly swaggerConfig: SwaggerConfig) {}

  set path(path: string) {
    this.swaggerPath = path;
  }

  get path(): string {
    return this.swaggerPath;
  }

  run(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
      .setTitle('Art City Api Document')
      .setDescription('Art City Advertising Company Limited')
      .setVersion('1.0.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .addSecurityRequirements('bearer')
      .setExternalDoc('Postman Collection', '/openapi-json')
      .build();

    const options: SwaggerDocumentOptions & SwaggerCustomOptions = {
      url: this.swaggerConfig.swaggerUrl,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup(this.path, app, document);
    this.logger.log(`Swagger is running on path /${this.path}`);
  }
}
