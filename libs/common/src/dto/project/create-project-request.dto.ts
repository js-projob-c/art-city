import { IsOptional, IsString } from 'class-validator';

export class CreateProjectRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  ownerId: string;
}
