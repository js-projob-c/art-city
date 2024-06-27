import { IsBoolean } from 'class-validator';

export class ApproveOrRejectLeaveRequestDto {
  @IsBoolean()
  isApprove: boolean;
}
