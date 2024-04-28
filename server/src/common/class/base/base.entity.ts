import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: string | undefined;
}
