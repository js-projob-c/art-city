import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AwsVariables {
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}

@Injectable()
export class AwsConfig {
  constructor(private readonly configService: ConfigService<AwsVariables>) {}

  get region(): string {
    return this.configService.getOrThrow('AWS_REGION');
  }

  get accessKeyId(): string {
    return this.configService.getOrThrow('AWS_ACCESS_KEY_ID');
  }

  get secretAccessKey(): string {
    return this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY');
  }
}
