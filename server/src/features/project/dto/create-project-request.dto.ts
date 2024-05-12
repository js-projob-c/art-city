import { IsString, IsUUID } from 'class-validator';

export class CreateProjectRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  ownerIds: string;
}
