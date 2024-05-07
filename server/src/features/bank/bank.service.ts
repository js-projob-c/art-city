import { ERROR_CODES } from '@art-city/common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from 'src/database/repositories/bank.repository';
import { BankEntity } from 'src/entities';

@Injectable()
export class BankService {
  constructor(private readonly bankRepository: BankRepository) {}

  async validateAndGetBank(id: string) {
    const bank = await this.bankRepository.findOne({
      where: { id },
    });
    if (!bank) {
      throw new NotFoundException(ERROR_CODES.BANK.BANK_NOT_FOUND);
    }
  }

  async getBanks() {
    return this.bankRepository.find();
  }

  async createBank(payload: Partial<BankEntity>) {
    return await this.bankRepository.save(this.bankRepository.create(payload));
  }

  async updateBank(id: string, payload: Partial<BankEntity>) {
    return await this.bankRepository.save({
      ...payload,
      id,
    });
  }
}
