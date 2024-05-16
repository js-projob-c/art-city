import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseEntity } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseRepository extends Repository<PurchaseEntity> {
  constructor(
    @InjectRepository(PurchaseEntity)
    protected repository: Repository<PurchaseEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
