import { DB_TABLE_NAMES } from '@art-city/common/constants';
import { UserDepartment, UserRole } from '@art-city/common/enums';
import {
  IAttendance,
  ICustomer,
  ILeave,
  IPayroll,
  IProject,
  IReimburse,
  ISchedule,
  ITask,
  IUser,
  IUserDetail,
} from '@art-city/common/types';
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

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.user)
  schedules: ISchedule[];

  @OneToMany(() => PayrollEntity, (payroll) => payroll.user)
  payrolls: IPayroll[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.users)
  @JoinTable({ name: DB_TABLE_NAMES.userCustomer })
  customers: ICustomer[];

  @ManyToMany(() => TaskEntity, (task) => task.users)
  tasks: ITask[];
}
