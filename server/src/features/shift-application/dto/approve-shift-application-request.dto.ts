import { IsBoolean } from 'class-validator';

export class ApproveShiftApplicationRequestDto {
  @IsBoolean()
  isApprove: boolean;
}
