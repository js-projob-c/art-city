import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { AttendanceEntity } from 'src/database/entities';

export class UpdateAttendanceRequestDto implements Partial<AttendanceEntity> {
  @IsOptional()
  @IsDateString()
  signInAt: string;
  @IsOptional()
  @IsDateString()
  signOutAt: string;
  @IsOptional()
  @IsUrl()
  supportDocumentBase64: string;
  @IsOptional()
  @IsString()
  remarks: string;
}
