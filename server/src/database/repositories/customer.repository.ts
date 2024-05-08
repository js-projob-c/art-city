import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    protected repository: Repository<CustomerEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
