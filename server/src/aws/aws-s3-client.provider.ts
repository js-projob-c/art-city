import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Logger } from '@nestjs/common';

import { AwsConfig } from './aws.config';
import { AwsS3Config } from './aws-s3.config';

export class AwsS3ClientProvider {
  private readonly logger: Logger = new Logger(AwsS3ClientProvider.name);

  constructor(
    private readonly awsConfig: AwsConfig,
    private readonly s3Config: AwsS3Config,
  ) {}

  public createConfig(): S3ClientConfig {
    const config: S3ClientConfig = {
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
      region: this.s3Config.getS3BucketRegion,
    };
    return config;
  }

  public async createClient() {
    const config: S3ClientConfig = this.createConfig();
    const s3Client = new S3Client(config);
    return s3Client;
  }
}
