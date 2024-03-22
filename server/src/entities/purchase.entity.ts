import { PurchaseStatus } from '@art-city/common/enums';
import {
  IPurchase,
  IPurchaseCounterpart,
  IPurchaseItem,
} from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PurchaseCounterpartEntity } from './purchase-counterpart.entity';

@Entity({ name: 'purchase' })
export class PurchaseEntity implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  counterpartId: string;

  @OneToOne(
    () => PurchaseCounterpartEntity,
    (counterpart) => counterpart.purchase,
  )
  @JoinColumn({ name: 'counterpartId' })
  counterpart: IPurchaseCounterpart;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'jsonb' })
  items: IPurchaseItem[];

  @Column({ type: 'enum', enum: PurchaseStatus })
  status: PurchaseStatus;

  @Column({ type: 'numeric' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
