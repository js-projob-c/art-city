export interface IErrorResponse {
  message: string | null;
  code: string | null;
  statusCode: number;
  path: string;
}
