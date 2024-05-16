import { REGEX } from '@art-city/common/constants';
import { Type } from 'class-transformer';
import { IsDateString, IsUUID, Matches, ValidateNested } from 'class-validator';
import { OrderEntity } from 'src/database/entities';

import { OrderItemDto } from './order-item.dto';

export class CreateOrderRequestDto implements Partial<OrderEntity> {
  @IsUUID()
  externalPartyId: string;

  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsDateString()
  @Matches(REGEX.DATE)
  orderDate: string;
}
