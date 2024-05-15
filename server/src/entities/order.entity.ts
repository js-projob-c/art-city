import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ExternalPartyCustomerType } from '@art-city/common/enums';
import { IOrder, IOrderItem, IOrderPartyDetails } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class OrderPartyDetails implements IOrderPartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string | undefined;
  phone?: string | undefined;
  customerSource: string;
  customerType: ExternalPartyCustomerType;
}

export class OrderItem implements IOrderItem {
  name: string;
  quantity: number;
  amount: number;
}

@Entity({ name: DB_TABLE_NAMES.order })
export class OrderEntity extends BaseEntity implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  externalPartyDetails: OrderPartyDetails;

  @Column({ type: 'jsonb' })
  items: IOrderItem[];

  @Column({ type: 'decimal' })
  totalAmount: number;

  @Column({ type: 'date' })
  orderDate: string;
}
