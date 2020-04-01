import {Model} from "../interfaces/Model";

export interface User extends Model {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
}
