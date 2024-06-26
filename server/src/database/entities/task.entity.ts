import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { TaskStatus, TaskVisibleTo } from '@art-city/common/enums';
import { ITask } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.task })
export class TaskEntity extends BaseEntity implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  projectId: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: ProjectEntity;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: TaskVisibleTo })
  visibleTo: TaskVisibleTo;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column({ type: 'int2', default: 0 })
  progress: number;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: string;

  @ManyToMany(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinTable({ name: DB_TABLE_NAMES.userTask })
  users: UserEntity[];
}
