import { Exclude } from 'class-transformer';

export class GetUserResponseDto {
  @Exclude()
  password: string;
}
