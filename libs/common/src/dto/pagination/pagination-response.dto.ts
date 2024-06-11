export class PaginationResponseDto<DataType = any[]> {
  data: DataType;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
