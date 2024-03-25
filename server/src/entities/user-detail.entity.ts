import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { IUser, IUserDetail } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_NAMES.userDetail })
export class UserDetailEntity implements IUserDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity, (user) => user.detail)
  user: IUser;

  @Column({ type: 'numeric' })
  monthlySalary: number;

  @Column({ type: 'smallint' })
  annualLeave: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | undefined;
}
