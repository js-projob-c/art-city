import { PaginationRequestDto } from '@art-city/common/dto/pagination/pagination-request.dto';
import { PaginationResponseDto } from '@art-city/common/dto/pagination/pagination-response.dto';

export class PaginationUtil {
  static getTypeOrmQuery(paginationRequestDto: PaginationRequestDto) {
    return {
      take: paginationRequestDto.limit,
      skip: paginationRequestDto.limit * (paginationRequestDto.page - 1),
    };
  }

  static getPaginationResponse(
    paginationRequestDto: PaginationRequestDto,
    total: number,
  ): PaginationResponseDto {
    return {
      limit: paginationRequestDto.limit,
      page: paginationRequestDto.page,
      total,
      totalPages: Math.ceil(total / paginationRequestDto.limit),
    };
  }
}
