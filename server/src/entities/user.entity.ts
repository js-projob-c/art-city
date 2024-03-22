import { UserDepartment, UserRole } from '@art-city/common/enums';
import {
  IAttendance,
  ILeave,
  IProject,
  IReimburse,
  ITask,
  IUser,
  IUserDetail,
} from '@art-city/common/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AttendanceEntity } from './attendance.entity';
import { LeaveEntity } from './leave.entity';
import { ProjectEntity } from './project.entity';
import { ReimburseEntity } from './reimburse.entity';
import { TaskEntity } from './task.entity';
import { UserDetailEntity } from './user-detail.entity';

@Entity({ name: 'user' })
export class UserEntity implements IUser {
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
  detail: IUserDetail;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.user)
  attendances: IAttendance[];

  @OneToMany(() => LeaveEntity, (leave) => leave.user)
  leaves: ILeave[];

  @OneToMany(() => ProjectEntity, (project) => project.owner)
  projects: IProject[];

  @OneToMany(() => ReimburseEntity, (reimburse) => reimburse.user)
  reimburses: IReimburse[];

  @ManyToMany(() => TaskEntity, (task) => task.users)
  @JoinTable()
  tasks: ITask[];
}
