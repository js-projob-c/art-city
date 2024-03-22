import { IEntity } from '.';

export interface ISchedule extends IEntity {
  id: string;
  userId: string;
  date: string;
}
