import { IPurchase, IPurchaseCounterpart } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PurchaseEntity } from './purchase.entity';

@Entity({ name: 'purchase-counterpart' })
export class PurchaseCounterpartEntity implements IPurchaseCounterpart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  company: string;

  @Column({ type: 'varchar' })
  contactPerson: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => PurchaseEntity, (purchase) => purchase.counterpart)
  purchase: IPurchase;
}
