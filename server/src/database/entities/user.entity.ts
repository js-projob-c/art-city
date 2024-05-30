import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import { IUser } from '@art-city/common/types';
import { BaseEntity } from 'src/common/class/base';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AttendanceEntity } from './attendance.entity';
import { CustomerEntity } from './customer.entity';
import { LeaveEntity } from './leave.entity';
import { PayrollEntity } from './payroll.entity';
import { ProjectEntity } from './project.entity';
import { ReimburseEntity } from './reimburse.entity';
import { ScheduleEntity } from './schedule.entity';
import { ShiftApplicationEntity } from './shift-application.entity';
import { TaskEntity } from './task.entity';
import { UserDetailEntity } from './user-detail.entity';

@Entity({ name: DB_TABLE_NAMES.user })
export class UserEntity extends BaseEntity implements IUser {
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

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user, {
    onDelete: 'CASCADE',
  })
  detail: UserDetailEntity;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.user, {
    onDelete: 'CASCADE',
  })
  attendances: AttendanceEntity[];

  @OneToMany(() => LeaveEntity, (leave) => leave.user, {
    onDelete: 'CASCADE',
  })
  leaves: LeaveEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.owner, {
    onDelete: 'SET NULL',
  })
  projects: ProjectEntity[];

  @OneToMany(() => ReimburseEntity, (reimburse) => reimburse.user, {
    onDelete: 'CASCADE',
  })
  reimburses: ReimburseEntity[];

  @OneToMany(
    () => ShiftApplicationEntity,
    (shiftApplication) => shiftApplication.user,
    {
      onDelete: 'CASCADE',
    },
  )
  shiftApplications: ShiftApplicationEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.user, {
    onDelete: 'CASCADE',
  })
  schedules: ScheduleEntity[];

  @OneToMany(() => PayrollEntity, (payroll) => payroll.user, {
    onDelete: 'CASCADE',
  })
  payrolls: PayrollEntity[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.users, {
    onDelete: 'SET NULL',
  })
  @JoinTable({ name: DB_TABLE_NAMES.userCustomer })
  customers: CustomerEntity[];

  @ManyToMany(() => TaskEntity, (task) => task.users, {
    onDelete: 'SET NULL',
  })
  tasks: TaskEntity[];
}
