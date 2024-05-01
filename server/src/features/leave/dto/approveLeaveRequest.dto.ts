import { IsBoolean } from 'class-validator';

export class ApproveLeaveRequestDto {
  @IsBoolean()
  isApprove: boolean;
}
