import { IUser, IUserDetail } from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'user-detail' })
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
}
