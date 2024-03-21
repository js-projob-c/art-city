import { BaseType } from '.';

export interface ScheduleType extends BaseType {
  id: string;
  userId: string;
  date: string;
}
