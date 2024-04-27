import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ProjectStatus } from '@art-city/common/enums';
import { IProject, ITask, IUser } from '@art-city/common/types';
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

  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: 'ownerId' })
  owner: IUser;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;
  status: ProjectStatus;

  @Column({ type: 'timestamptz' })
  completedAt: string;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: ITask[];
}
