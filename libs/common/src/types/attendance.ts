import { BaseType } from '.';

export interface AttendanceType extends BaseType {
  id: string;
  userId: string;
  signInAt: string;
  signOutAt?: string;
  workHourFrom: string;
  workHourTo: string;
  supportDocument?: string;
}
