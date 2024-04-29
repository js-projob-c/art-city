import { UserRole } from '@art-city/common/enums';
import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';

import { UploadFileRequestDto } from './dto/uploadFileRequest.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  private logger = new Logger(FilesController.name);
  constructor(private readonly filesService: FilesService) {}

  // @UseGuards(
  //   new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]),
  // )
  // @Post('upload/public')
  // async uploadPublicFile(@Body() dto: UploadFileRequestDto) {
  //   const payload = dto.files.map((obj) => ({
  //     path: ['public', ...dto.paths],
  //     name: obj.name,
  //     data: obj.data,
  //   }));
  //   const result = await Promise.all(
  //     payload.map((obj) => this.filesService.uploadBase64File(obj)),
  //   );

  //   const fileUrls = result
  //     .map((obj) => (obj ? getFullS3Url(obj.Key) : null))
  //     .filter((item) => item);
  //   // this.logger.debug(this.uploadPublicFile.name, fileUrls);
  //   return { files: fileUrls };
  // }

  @UseGuards(
    new JwtAuthGuard([UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]),
  )
  @Post('upload')
  async uploadFile(@User() user, @Body() dto: UploadFileRequestDto) {
    const { id } = user;

    const path = this.filesService.getFilePath(dto.category);
    await Promise.all(
      dto.files.map((obj) =>
        this.filesService.uploadLocalFile({
          path,
          data: obj.base64 as unknown as Buffer,
          name: obj.name,
        }),
      ),
    );

    // const payload = dto.files.map((obj) => ({
    //   path: [...dto.categories, id, ...dto.paths],
    //   name: obj.name,
    //   data: obj.data,
    // }));
    // const result = await Promise.all(
    //   payload.map((obj) => this.filesService.uploadBase64File(obj)),
    // );

    // const fileUrls = result
    //   .map((obj) => (obj ? getFullS3Url(obj.Key) : null))
    //   .filter((item) => item);

    // return { files: fileUrls };
    return { path };
  }
}
