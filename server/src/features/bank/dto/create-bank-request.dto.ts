import { IsString } from 'class-validator';
import { BankEntity } from 'src/database/entities';

export class CreateBankRequestDto implements Partial<BankEntity> {
  @IsString()
  name: string;
  @IsString()
  bank: string;
  @IsString()
  account: string;
}
