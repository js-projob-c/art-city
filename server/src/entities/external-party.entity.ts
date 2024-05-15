import { DB_TABLE_NAMES } from '@art-city/common/constants';
import {
  ExternalPartyCustomerType,
  ExternalPartyType,
} from '@art-city/common/enums';
import { IExternalParty } from '@art-city/common/types';
// import { IExternalProject } from '@art-city/common/types/external-project';
import { BaseEntity } from 'src/common/class/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { ExternalProjectEntity } from './external-project.entity';
// import { PurchaseEntity } from './purchase.entity';

@Entity({ name: DB_TABLE_NAMES.externalParty })
export class ExternalPartyEntity extends BaseEntity implements IExternalParty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  company: string;

  @Column({ type: 'varchar' })
  contactName: string;

  @Column({ type: 'varchar' })
  contactRole: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ExternalPartyType, array: true })
  types: ExternalPartyType[];

  @Column({ type: 'varchar', nullable: true })
  customerSource?: string;

  @Column({ type: 'enum', enum: ExternalPartyCustomerType, nullable: true })
  customerType?: ExternalPartyCustomerType;

  // @ManyToOne(() => PurchaseEntity, (purchase) => purchase.externalParty)
  // purchases: IPurchase[];

  // @ManyToOne(
  //   () => ExternalProjectEntity,
  //   (externalProject) => externalProject.externalParty,
  // )
  // externalProjects: IExternalProject[];
}
