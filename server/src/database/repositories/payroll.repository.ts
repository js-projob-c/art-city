import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayrollEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PayrollRepository extends Repository<PayrollEntity> {
  constructor(
    @InjectRepository(PayrollEntity)
    protected repository: Repository<PayrollEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
