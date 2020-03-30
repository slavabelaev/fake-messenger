import {Message} from "./Message";
import {User} from "./User";

export interface Contact extends User {
    lastMessage: Message;
    lastVisitAt: Date;
    isOnline: boolean;
}

