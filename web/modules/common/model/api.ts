export type BaseApiResponse<T> = {
  responseObject: T;
  message: string;
  success: boolean;
  statusCode: number;
};
