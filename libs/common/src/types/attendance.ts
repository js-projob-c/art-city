import { IEntity } from '.';

export interface IAttendance extends IEntity {
  id: string;
  userId: string;
  signInAt: string;
  signOutAt?: string;
  workHourFrom: string;
  workHourTo: string;
  supportDocument?: string;
  remarks?: string;
}
