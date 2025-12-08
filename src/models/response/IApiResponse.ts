export interface IApiResponse<T> {
  message: string;
  token: string;
  data: T;
}
