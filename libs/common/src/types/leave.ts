import { LeaveStatus } from '../enums';
import { IEntity } from '.';

export interface ILeave extends IEntity {
  id: string;
  userId: string;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  reviewerId?: string;
  reviewedAt?: string;
}
