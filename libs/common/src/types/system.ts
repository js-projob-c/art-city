import { BaseType } from '.';

export interface SystemType extends BaseType {
  id: string;
  workHourFrom: string;
  workHourTo: string;
}
