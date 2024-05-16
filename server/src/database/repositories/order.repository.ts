import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    protected repository: Repository<OrderEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
