import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ISchedule, IUser } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.schedule })
export class ScheduleEntity implements ISchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.schedules)
  user: IUser;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
