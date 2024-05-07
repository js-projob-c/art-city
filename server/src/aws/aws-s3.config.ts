import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AwsS3Variables {
  S3_BUCKET: string;
  S3_BUCKET_PRIVATE: string;
  S3_BUCKET_REGION: string;
}

@Injectable()
export class AwsS3Config {
  constructor(private configService: ConfigService<AwsS3Variables>) {}

  get getS3Bucket(): string {
    return this.configService.getOrThrow('S3_BUCKET');
  }

  // get getPrivateS3Bucket(): string {
  //   return this.configService.getOrThrow('S3_BUCKET_PRIVATE');
  // }

  get getS3BucketRegion(): string {
    return this.configService.getOrThrow('S3_BUCKET_REGION');
  }
}
