import { FileCategory } from '@art-city/common/enums';
import { FileUtil } from '@art-city/common/utils/file.util';
import { Injectable, Logger } from '@nestjs/common';
import { AwsS3Service } from 'src/aws/aws-s3.service';

interface Base64FilePayload {
  path: string;
  name: string;
  data: string;
}

@Injectable()
export class FilesService {
  private logger = new Logger(FilesService.name);

  constructor(private readonly s3Service: AwsS3Service) {}

  async uploadBase64File(file: Base64FilePayload) {
    const result = await this.s3Service.uploadBase64ToS3(
      file.path,
      file.name,
      file.data,
    );
    return result;
  }

  getFilePath(category: FileCategory) {
    switch (category) {
      case FileCategory.ATTENDANCE_SUPPORTING:
        return '/attendance/supporting';
      default:
        throw new Error('No file category matched');
    }
  }

  generateUniqueName(fileName: string) {
    const { name, extension } = FileUtil.extractFileNameAndExtension(fileName);
    const randomString = Math.random().toString(36).substring(7);
    return `${name}${randomString}.${extension}`;
  }
}
