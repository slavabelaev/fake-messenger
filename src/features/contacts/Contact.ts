import {Message} from "../messages/Message";
import {User} from "../auth/User";

export interface Contact extends User {
    lastMessage: Message;
    lastVisitAt: Date;
    isOnline: boolean;
    notificationsEnabled: boolean;
}

