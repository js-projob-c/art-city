import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import {
  IExternalProject,
  IExternalProjectPartyDetails,
} from '@art-city/common/types/external-project';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ExternalPartyEntity } from './external-party.entity';

export class ExternalProjectParty implements IExternalProjectPartyDetails {
  id: string;
  company: string;
  contactName: string;
  contactRole: string;
  email?: string | undefined;
  phone?: string | undefined;
}

@Entity({ name: DB_TABLE_NAMES.externalProject })
export class ExternalProjectEntity
  extends BaseEntity
  implements IExternalProject
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  externalPartyId: string;

  @ManyToOne(() => ExternalPartyEntity, (user) => user.externalProjects, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'externalPartyId' })
  externalParty: ExternalPartyEntity;

  @Column({ type: 'jsonb' })
  externalPartyDetails: ExternalProjectParty;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ExternalProjectStatus })
  status: ExternalProjectStatus;
}
