import { ShiftApplicationStatus } from '../enums';
import { IEntity } from '.';

export interface IShiftApplication extends IEntity {
  id: string;
  userId: string;
  fromDate: string;
  toDate: string;
  reason?: string;
  status: ShiftApplicationStatus;
  reviewerId?: string;
  reviewedAt?: string;
}
