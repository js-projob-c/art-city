import { IEntity } from '.';

export interface ILeave extends IEntity {
  id: string;
  userId: string;
  from: string;
  to: string;
  days: number;
  status: string;
  applyReason: string;
  approvedBy?: string;
  rejectedBy?: string;
  approvedAt: string;
  rejectedAt: string;
}
