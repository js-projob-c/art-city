import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BankRepository extends Repository<BankEntity> {
  constructor(
    @InjectRepository(BankEntity)
    protected readonly repository: Repository<BankEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
