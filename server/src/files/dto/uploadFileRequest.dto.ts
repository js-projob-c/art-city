import { FileCategory } from '@art-city/common/enums';
import { IsArray, IsBase64, IsEnum, IsString, Matches } from 'class-validator';

class FilePayload {
  @IsString()
  @Matches(/^[\w,\s-]+\.[A-Za-z]{3}$/)
  name: string;
  @IsBase64()
  base64: string;
}

export class UploadFileRequestDto {
  @IsEnum(FileCategory)
  category: FileCategory;
  @IsArray()
  files: FilePayload[];
}
