import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IUserDetail } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.userDetail })
export class UserDetailEntity extends BaseEntity implements IUserDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity, (user) => user.detail, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ type: 'int' })
  monthlySalary: number;

  @Column({ type: 'smallint' })
  annualLeave: number;
}
