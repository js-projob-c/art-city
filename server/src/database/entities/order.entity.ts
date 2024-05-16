import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IOrder, IOrderItem, IOrderPartyDetails } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ExternalPartyEntity } from './external-party.entity';

export class OrderPartyDetails implements IOrderPartyDetails {
  id: string;
  company: string;
  contactName: string;
  contactRole: string;
  email?: string | undefined;
  phone?: string | undefined;
  customerSource: string;
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

  externalPartyId: string;

  @ManyToOne(() => ExternalPartyEntity, (user) => user.externalProjects, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'externalPartyId' })
  externalParty: ExternalPartyEntity;

  @Column({ type: 'jsonb' })
  externalPartyDetails: OrderPartyDetails;

  @Column({ type: 'jsonb' })
  items: OrderItem[];

  @Column({ type: 'decimal' })
  totalAmount: number;

  @Column({ type: 'date' })
  orderDate: string;
}
