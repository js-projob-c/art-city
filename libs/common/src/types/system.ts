import { IEntity } from '.';

export interface ISystem extends IEntity {
  id: string;
  workHourFrom: string;
  workHourTo: string;
}
