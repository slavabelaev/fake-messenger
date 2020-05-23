export interface ErrorResponse {
    errors: string[];
}

export interface FetchList<T> {
    items: T[];
    count: number;
}