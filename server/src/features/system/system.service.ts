import { ISystem } from '@art-city/common/types';
import { Injectable } from '@nestjs/common';
import { SystemRepository } from 'src/database/repositories';
import { SystemEntity } from 'src/database/entities';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(private readonly systemRepo: SystemRepository) {}

  async createOrEditSystem(dto: Partial<SystemEntity>) {
    const system = await this.systemRepo.findOne({
      where: { id: Not(IsNull()) },
    });
    if (system) {
      await this.systemRepo.update(system.id, dto);
    } else {
      await this.systemRepo.save(dto);
    }
  }

  async createSystem(dto: Partial<SystemEntity>) {
    const system = this.systemRepo.create(dto);
    await this.systemRepo.save(system);
  }

  async updateSystem(dto: Partial<SystemEntity>) {
    await this.systemRepo.update({}, dto);
  }

  async getSystem(): Promise<ISystem | null> {
    return await this.systemRepo.findOne({
      where: { id: Not(IsNull()) },
    });
  }
}
