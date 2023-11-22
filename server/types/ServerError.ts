export interface ServerError extends ErrorConstructor {
  statusCode: number;
  status: string;
  message: string;
}
