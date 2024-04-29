export type IErrorFields = Record<
  string,
  { message: string; constraint: string }
>;

export interface IErrorResponse {
  message: string[];
  code: string | null;
  statusCode: number;
  path: string;
  fields: IErrorFields;
}
