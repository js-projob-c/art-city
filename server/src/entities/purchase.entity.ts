import { PurchaseStatus } from '@art-city/common/enums';
import {
  IExternalParty,
  IPurchase,
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

import { ExternalPartyEntity } from './external-party.entity';

@Entity({ name: 'purchase' })
export class PurchaseEntity implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  externalPartyId: string;

  @OneToOne(
    () => ExternalPartyEntity,
    (externalParty) => externalParty.purchase,
  )
  @JoinColumn({ name: 'externalPartyId' })
  externalParty: IExternalParty;

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
