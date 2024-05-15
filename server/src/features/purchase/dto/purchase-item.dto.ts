import { IsNumber, IsString, Min } from 'class-validator';

export class CreatePurchaseItemsDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
