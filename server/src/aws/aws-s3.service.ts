import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FileUtil } from 'src/common/utils/file.util';

import { AwsS3Config } from './aws-s3.config';

@Injectable()
export class AwsS3Service {
  private readonly logger: Logger = new Logger(AwsS3Service.name);

  bucketName: string;
  region: string;

  constructor(
    private readonly config: AwsS3Config,
    private readonly s3Client: S3Client,
  ) {
    this.bucketName = this.config.getS3Bucket;
    this.region = this.config.getS3BucketRegion;
  }

  async uploadBase64ToS3(
    path: string,
    fileName: string,
    base64Data: string,
  ): Promise<
    (PutObjectCommandOutput & { Bucket: string; Key: string }) | false
  > {
    try {
      const bucketName = this.bucketName;
      const fileStream = FileUtil.getBase64StreamReadable(base64Data);

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: path + '/' + fileName,
        ContentLength: fileStream.readableLength,
      };

      const result = await this.uploadAwsS3Object(uploadParams);
      return { ...result, Bucket: uploadParams.Bucket, Key: uploadParams.Key };
    } catch (error) {
      this.logger.error(`[uploadBase64ToS3] - `, error);
      throw new InternalServerErrorException();
    }
  }

  async uploadAwsS3Object(param: PutObjectCommandInput) {
    const command = new PutObjectCommand(param);
    return await this.s3Client.send(command);
  }

  getFullS3Urls(keys: string[]) {
    return keys.map((key) => {
      const fullObjectKey = key?.startsWith('/') ? key : '/' + key;
      //   return `${env.AWS_FILE_URL}${fullObjectKey}`;
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com${fullObjectKey}`;
    });
  }
}
