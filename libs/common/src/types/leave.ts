import { LeaveStatus, LeaveType } from '../enums';
import { IEntity } from '.';

export interface ILeave extends IEntity {
  id: string;
  userId: string;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  type: LeaveType;
  reason: string;
  reviewerId?: string;
  reviewedAt?: string;
}
