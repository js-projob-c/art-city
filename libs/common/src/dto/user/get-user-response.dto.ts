import { IUserDetail } from '@art-city/common/types';
import { Exclude, Type } from 'class-transformer';

export class GetUserResponseDetailDto implements Partial<IUserDetail> {
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
