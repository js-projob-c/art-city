import { FileCategory } from '@art-city/common/enums';
// import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';
// import { streamReadable } from 'src/common/utils/file.util';
// import { base64StreamReadable, streamReadable } from 'src/common/utils/file';
// import { bucketName, getAwsS3Object, uploadAwsS3Object } from 'src/provider';

interface FilePayload {
  path: string;
  name: string;
  data: Buffer;
}

// interface Base64FilePayload {
//   path: string[];
//   name: string;
//   data: string;
// }

@Injectable()
export class FilesService {
  private logger = new Logger(FilesService.name);

  async uploadLocalFile(file: FilePayload): Promise<any> {
    try {
      await fs.writeFile(
        path.resolve(__dirname, `../uploads${file.path}/${file.name}`),
        file.data,
      );
      // const fileStream = streamReadable(file.data);
      // await writeFile(
      //   path.resolve(__dirname, `../uploads${file.path ?? ''}/${file.name}`),
      //   fileStream,
      // );
    } catch (error) {
      this.logger.error('uploadFile', error);
      throw new InternalServerErrorException();
    }
  }

  // upload file to s3
  // async uploadFile(
  //   file: FilePayload,
  // ): Promise<PutObjectCommandOutput & { Bucket: string; Key: string }> {
  //   if (!bucketName) throw new UnprocessableEntityException();
  //   try {
  //     const pathArray = isArray(file.path) ? file.path : [];
  //     // const fileStream = fs.createReadStream(file.path);
  //     const fileStream = streamReadable(file.data);
  //     // console.log('fileStream', fileStream);
  //     const uploadParams = {
  //       Bucket: bucketName,
  //       Body: fileStream,
  //       Key: [...pathArray, file.name].join('/'),
  //       ContentLength: fileStream.readableLength,
  //     };

  //     const result = await uploadAwsS3Object(uploadParams);
  //     return { ...result, Bucket: uploadParams.Bucket, Key: uploadParams.Key };
  //   } catch (error) {
  //     this.logger.error('uploadFile', error);
  //     throw new InternalServerErrorException();
  //   }

  //   // return await uploadAwsS3Object(uploadParams);
  //   // return s3.upload(uploadParams).promise();
  // }

  // async uploadBase64File(
  //   file: Base64FilePayload,
  // ): Promise<
  //   (PutObjectCommandOutput & { Bucket: string; Key: string }) | false
  // > {
  //   if (!bucketName) throw new UnprocessableEntityException();
  //   try {
  //     const pathArray = isArray(file.path) ? file.path : [];
  //     // const fileStream = fs.createReadStream(file.path);
  //     const fileStream = base64StreamReadable(file.data);
  //     // console.log('fileStream', fileStream);
  //     const uploadParams = {
  //       Bucket: bucketName,
  //       Body: fileStream,
  //       Key: [...pathArray, file.name].join('/'),
  //       ContentLength: fileStream.readableLength,
  //     };

  //     const result = await uploadAwsS3Object(uploadParams);
  //     return { ...result, Bucket: uploadParams.Bucket, Key: uploadParams.Key };
  //   } catch (error) {
  //     this.logger.error('uploadBase64File', error);
  //     throw new InternalServerErrorException();
  //   }

  //   // return await uploadAwsS3Object(uploadParams);
  //   // return s3.upload(uploadParams).promise();
  // }

  // downloads a file from s3
  // async getFileStream(bucketName, fileKey: string) {
  //   const downloadParams = {
  //     Key: fileKey,
  //     Bucket: bucketName,
  //   };
  //   return await getAwsS3Object(downloadParams);
  //   // return await s3.getObject(downloadParams);
  // }

  getFilePath(category: FileCategory) {
    switch (category) {
      case FileCategory.ATTENDANCE_SUPPORTING:
        return '/attendance/supporting';
      default:
        throw new Error('No file category matched');
    }
  }
}
