import {Model} from "../interfaces/Model";
import {Contact} from "./Contact";

export interface Message extends Model {
    text: string;
    createdBy?: Contact['id'];
    createdAt: Date;
    delivered: boolean;
    read: boolean;
}
