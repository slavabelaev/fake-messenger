export interface ErrorResponse {
    errors: string[];
}

export interface SuccessResponse<T> {
    items: T[];
    count: number;
}