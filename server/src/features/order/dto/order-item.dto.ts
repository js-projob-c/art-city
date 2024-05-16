import { IsNumber, IsString, Min } from 'class-validator';
import { OrderItem } from 'src/database/entities/order.entity';

export class OrderItemDto implements OrderItem {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(1)
  amount: number;
}
