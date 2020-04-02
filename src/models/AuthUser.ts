import {User} from "./User";

export interface AuthUser extends User {
    isOnline: boolean;
}

export type UserProfile = Partial<User>;
