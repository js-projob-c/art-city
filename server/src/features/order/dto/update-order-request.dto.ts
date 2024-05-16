import { PartialType } from '@nestjs/swagger';

import { CreateOrderRequestDto } from './create-order-request.dto';

export class UpdateOrderRequestDto extends PartialType(CreateOrderRequestDto) {}
