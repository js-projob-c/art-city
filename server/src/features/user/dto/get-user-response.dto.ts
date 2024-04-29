import { Exclude, Type } from 'class-transformer';
import { UserDetailEntity } from 'src/entities';

export class GetUserResponseDetailDto implements Partial<UserDetailEntity> {
  @Exclude()
  deletedAt: string;
}

export class GetUserResponseDto {
  @Exclude()
  password: string;
  @Type(() => GetUserResponseDetailDto)
  detail: GetUserResponseDetailDto;
  @Exclude()
  deletedAt: string;
}
