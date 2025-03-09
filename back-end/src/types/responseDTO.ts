export interface ResponseDTO<T> {
    data?: T;
    total?: number;
    pageNum?: number;
    pageSize?: number;
    success: boolean;
    message: string;
}