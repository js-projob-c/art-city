import { UserRole } from '@art-city/common/enums';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BankService } from './bank.service';
import { CreateBankRequestDto } from './dto/create-bank-request.dto';

@UseGuards(new JwtAuthGuard())
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  async getBanks() {
    return this.bankService.getBanks();
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Post()
  async createBank(@Body() dto: CreateBankRequestDto) {
    return await this.bankService.createBank(dto);
  }

  @UseGuards(new JwtAuthGuard([UserRole.ADMIN]))
  @Put(':bankId')
  async update(
    @Param('bankId') bankId: string,
    @Body() dto: CreateBankRequestDto,
  ) {
    await this.bankService.validateAndGetBank(bankId);
    return await this.bankService.updateBank(bankId, dto);
  }
}
