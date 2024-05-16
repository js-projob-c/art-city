import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ProjectStatus } from '@art-city/common/enums';
import { IProject } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.project })
export class ProjectEntity extends BaseEntity implements IProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  ownerId: string;

  @ManyToOne(() => UserEntity, (user) => user.projects, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ProjectStatus })
  status: ProjectStatus;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: string;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];
}
