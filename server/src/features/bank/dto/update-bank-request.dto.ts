import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BankEntity } from 'src/entities';

import { CreateBankRequestDto } from './create-bank-request.dto';

export class UpdateBankRequestDto
  extends PartialType(CreateBankRequestDto)
  implements Partial<BankEntity>
{
  @IsString()
  name: string;
  @IsString()
  bank: string;
  @IsString()
  account: string;
}
