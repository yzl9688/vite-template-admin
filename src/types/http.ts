export interface ResponseInfo<T extends { [prop: string]: any } = {}> {
  code: number;
  data: T | null;
  message: string;
}
