import { IsBoolean } from 'class-validator';

export class ApproveReimburseApplicationRequestDto {
  @IsBoolean()
  isApprove: boolean;
}
