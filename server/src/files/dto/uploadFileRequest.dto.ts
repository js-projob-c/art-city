import { FileCategory } from '@art-city/common/enums';
import { IsArray, IsEnum, IsString, Matches } from 'class-validator';

class FilePayload {
  @IsString()
  @Matches(/^[\w,\s-]+\.[A-Za-z]{3}$/)
  name: string;
  @IsString()
  data: string;
}

export class UploadFileRequestDto {
  @IsEnum(FileCategory)
  category: FileCategory;
  @IsArray()
  paths: string[];
  @IsArray()
  files: FilePayload[];
}
