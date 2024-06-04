import { IsBoolean, IsOptional, IsString } from 'class-validator';

// import { CreateProjectRequestDto } from './create-project-request.dto';

export class UpdateProjectRequestDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  ownerId: string;

  @IsBoolean()
  @IsOptional()
  isAbandoned?: boolean;
}
