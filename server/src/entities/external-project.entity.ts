import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ExternalProjectStatus } from '@art-city/common/enums/external-project';
import { IExternalParty } from '@art-city/common/types';
import { IExternalProject } from '@art-city/common/types/external-project';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ExternalPartyEntity } from './external-party.entity';

@Entity({ name: DB_TABLE_NAMES.externalProject })
export class ExternalProjectEntity implements IExternalProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  externalPartyId: string;

  @ManyToOne(() => ExternalPartyEntity, (user) => user.externalProjects)
  @JoinColumn({ name: 'externalPartyId' })
  externalParty: IExternalParty;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ExternalProjectStatus })
  status: ExternalProjectStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
