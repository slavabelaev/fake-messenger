import {Model} from "../interfaces/Model";

export interface Message extends Model {
    text: string;
    createdAt: Date;
    delivered: boolean;
    read: boolean;
}
