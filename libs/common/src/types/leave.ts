import { LeaveDayType, LeaveStatus, LeaveType } from '../enums';
import { IEntity } from '.';

export interface ILeave extends IEntity {
  id: string;
  userId: string;
  from: string;
  fromDayType: LeaveDayType;
  to: string;
  toDayType: LeaveDayType;
  days: number;
  status: LeaveStatus;
  type: LeaveType;
  reason: string;
  reviewerId?: string;
  reviewedAt?: string;
}
