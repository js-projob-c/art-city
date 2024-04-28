import { AttendanceStatus } from '@art-city/common/enums';
import { IUser } from '@art-city/common/types';
import { Expose } from 'class-transformer';
import { AttendanceEntity } from 'src/entities';

export class GetAttendanceResponseDto implements AttendanceEntity {
  @Expose()
  id: string;

  @Expose()
  signInAt: string;

  @Expose()
  signOutAt?: string | undefined;

  @Expose()
  workHourFrom: string;

  @Expose()
  workHourTo: string;

  @Expose()
  supportDocument?: string | undefined;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  status: AttendanceStatus;

  @Expose()
  remarks: string;

  user: IUser;
  userId: string;
  deletedAt?: string | undefined;
}
