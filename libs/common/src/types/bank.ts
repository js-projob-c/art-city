import { BaseType } from '.';

export interface BankType extends BaseType {
  id: string;
  name: string;
  account: string;
}
