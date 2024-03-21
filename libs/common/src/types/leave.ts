import { BaseType } from '.';

export interface LeaveType extends BaseType {
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
