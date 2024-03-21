import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserDepartment, UserRole, UserType } from '@art-city/common';

@Entity()
export class User implements UserType {
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

  @Column({ type: 'text' })
  role: UserRole;

  @Column({ type: 'text' })
  department: UserDepartment;
}
