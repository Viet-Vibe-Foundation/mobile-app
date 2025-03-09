export default interface ResponseDTO<T> {
  data?: T;
  message?: string;
  pageNum?: number;
  pageSize?: number;
  total?: number;
  success?: boolean;
}
