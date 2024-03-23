import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { TaskStatus, TaskVisibleTo } from '@art-city/common/enums';
import { IProject, ITask, IUser } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.task })
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  projectId: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: IProject;

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

  @Column({ type: 'timestamp' })
  completedAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user) => user.tasks)
  users: IUser[];
}
