import { IExternalParty, IPurchase } from '@art-city/common/types';
import { IExternalProject } from '@art-city/common/types/external-project';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ExternalProjectEntity } from './external-project.entity';
import { PurchaseEntity } from './purchase.entity';

@Entity({ name: 'purchase-counterpart' })
export class ExternalPartyEntity implements IExternalParty {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.externalParty)
  purchases: IPurchase[];

  @ManyToOne(
    () => ExternalProjectEntity,
    (externalProject) => externalProject.externalParty,
  )
  externalProjects: IExternalProject[];
}
