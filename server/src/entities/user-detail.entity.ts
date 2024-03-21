import { UserDetailType, UserType } from '@art-city/common/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserDetailEntity implements UserDetailType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity, (user) => user.detail)
  user: UserType;

  @Column({ type: 'numeric' })
  monthlySalary: number;

  @Column({ type: 'smallint' })
  annualLeave: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
