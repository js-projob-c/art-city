import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { PurchaseStatus } from '@art-city/common/enums';
import {
  IExternalParty,
  IPurchase,
  IPurchaseItem,
} from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ExternalPartyEntity } from './external-party.entity';

@Entity({ name: DB_TABLE_NAMES.purchase })
export class PurchaseEntity implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  externalPartyId: string;

  @OneToOne(
    () => ExternalPartyEntity,
    (externalParty) => externalParty.purchases,
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

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
