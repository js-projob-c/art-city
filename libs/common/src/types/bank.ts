import { IEntity } from '.';

export interface IBank extends IEntity {
  id: string;
  name: string;
  bank: string;
  account: string;
}
