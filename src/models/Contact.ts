import {Model} from "../interfaces/Model";
import {Message} from "./Message";

export interface Contact extends Model {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    lastMessage: Message;
    lastVisitAt: Date;
    isOnline: boolean;
}

