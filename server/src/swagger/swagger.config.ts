import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ISwaggerConfigVariables {
  API_URL: string;
}

@Injectable()
export class SwaggerConfig {
  constructor(
    private readonly configService: ConfigService<ISwaggerConfigVariables>,
  ) {}

  get swaggerUrl() {
    return this.configService.get('API_URL', { infer: true });
  }
}
