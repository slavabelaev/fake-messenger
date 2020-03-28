import {Model} from "./Model";

export interface FindAllResponse<M extends Model> {
    items: M[];
    count: number;
}

export type FindResponse<M extends Model> = M;

export interface InsertResponse<M extends Model> {
    insertedIds: M['id'][];
}

export interface UpdateResponse {
    modifiedCount: number;
}

export interface DeleteResponse {
    deletedCount: number;
}

export interface ErrorResponse {
    errors: string[];
}

export type FindAllRequest<M extends Model> = (filter?: Partial<M>, skip?: number, limit?: number) => Promise<FindAllResponse<M> | ErrorResponse>;
export type FindRequest<M extends Model> = (filter: Partial<M>) => Promise<FindResponse<M> | ErrorResponse>;
export type InsertRequest<M extends Model> = (item: M) => Promise<InsertResponse<M> | ErrorResponse>;
export type InsertManyRequest<M extends Model> = (items: M[]) => Promise<InsertResponse<M> | ErrorResponse>;
export type UpdateRequest<M extends Model> = (item: M) => Promise<UpdateResponse | ErrorResponse>;
export type UpdateManyRequest<M extends Model> = (items: M[]) => Promise<UpdateResponse | ErrorResponse>;
export type DeleteOneRequest<M extends Model> = (filter: Partial<M>) => Promise<DeleteResponse | ErrorResponse>;
export type DeleteManyRequest<M extends Model> = (filter: Partial<M>) => Promise<DeleteResponse | ErrorResponse>;
