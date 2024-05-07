import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';

import { AwsConfig } from './aws.config';
import { AwsS3Config } from './aws-s3.config';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3ClientProvider } from './aws-s3-client.provider';

@Module({
  providers: [
    AwsS3Service,
    AwsConfig,
    AwsS3Config,
    {
      provide: S3Client,
      useFactory: async (awsConfig: AwsConfig, s3Config: AwsS3Config) => {
        const provider = new AwsS3ClientProvider(awsConfig, s3Config);
        return provider.createClient();
      },
      inject: [AwsConfig, AwsS3Config],
    },
  ],
  exports: [AwsS3Service],
})
export class AwsModule {}
