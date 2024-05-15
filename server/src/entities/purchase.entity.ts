import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { PurchaseStatus } from '@art-city/common/enums';
import {
  IPurchase,
  IPurchaseItem,
  IPurchasePartyDetails,
} from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { ExternalPartyEntity } from './external-party.entity';

export class PurchasePartyDetails implements IPurchasePartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string | undefined;
  phone?: string | undefined;
}

@Entity({ name: DB_TABLE_NAMES.purchase })
export class PurchaseEntity extends BaseEntity implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // externalPartyId: string;

  // @OneToOne(
  //   () => ExternalPartyEntity,
  //   (externalParty) => externalParty.purchases,
  // )
  // @JoinColumn({ name: 'externalPartyId' })
  // externalParty: IExternalParty;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'jsonb' })
  items: IPurchaseItem[];

  @Column({ type: 'enum', enum: PurchaseStatus })
  status: PurchaseStatus;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'jsonb' })
  externalPartyDetails: PurchasePartyDetails;
}
