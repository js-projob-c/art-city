import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { ISchedule, IUser } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.schedule })
export class ScheduleEntity extends BaseEntity implements ISchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.schedules)
  user: IUser;

  @Column({ type: 'date' })
  date: string;
}
