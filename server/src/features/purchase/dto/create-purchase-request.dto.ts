import { PurchaseStatus } from '@art-city/common/enums';
import { IPurchaseItem } from '@art-city/common/types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PurchaseEntity } from 'src/entities';

import { CreatePurchaseItemsDto } from './purchase-item.dto';

export class CreatePurchaseRequestDto implements Partial<PurchaseEntity> {
  @IsUUID()
  externalPartyId: string;

  @IsString()
  description: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemsDto)
  items: IPurchaseItem[];

  @IsEnum(PurchaseStatus)
  status: PurchaseStatus;

  @IsNumber()
  amount: number;
}
