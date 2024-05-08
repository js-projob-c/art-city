import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalPartyEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExternalPartyRepository extends Repository<ExternalPartyEntity> {
  constructor(
    @InjectRepository(ExternalPartyEntity)
    protected repository: Repository<ExternalPartyEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
