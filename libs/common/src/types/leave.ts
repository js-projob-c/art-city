import { IEntity } from '.';
import { LeaveStatus } from '../enums';

export interface ILeave extends IEntity {
  id: string;
  userId: string;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  applyReason: string;
  approvedBy?: string;
  rejectedBy?: string;
  approvedAt?: string;
  rejectedAt?: string;
}
