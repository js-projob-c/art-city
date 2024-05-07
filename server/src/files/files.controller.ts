import { UserRole } from '@art-city/common/enums';
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AwsS3Service } from 'src/aws/aws-s3.service';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';

import { UploadFileRequestDto } from './dto/uploadFileRequest.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  private logger = new Logger(FilesController.name);
  constructor(
    private readonly filesService: FilesService,
    private readonly s3Service: AwsS3Service,
  ) {}

  @UseGuards(
    new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]),
  )
  @Post('upload/public')
  async uploadPublicFile(@Body() dto: UploadFileRequestDto) {
    const path = this.filesService.getFilePath(dto.category);

    const results = await Promise.all(
      dto.files.map(async (file) => {
        const uniqueName = this.filesService.generateUniqueName(file.name);
        return this.filesService.uploadBase64File({
          path,
          name: uniqueName,
          data: file.base64,
        });
      }),
    );
    const fileUrls = this.s3Service.getFullS3Urls(
      results.filter((item) => !!item).map((result) => result['Key']),
    );
    return { fileUrls };
  }
}
