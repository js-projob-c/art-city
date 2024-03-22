import { UserDepartment, UserRole } from '@art-city/common/enums';
import {
  AttendanceType,
  UserDetailType,
  UserType,
} from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AttendanceEntity } from './attendance.entity';
import { UserDetailEntity } from './user-detail.entity';

@Entity()
export class UserEntity implements UserType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: UserDepartment })
  department: UserDepartment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user)
  detail: UserDetailType;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.user)
  attendance: AttendanceType;
}
