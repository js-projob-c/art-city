import { IsString } from 'class-validator';
export class BaseUpdateRequestDto {
  @IsString()
  id: string;
}
