import {Model} from "../interfaces/Model";

export interface AuthUser extends Model {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    isOnline: boolean;
}
