import {AuthUser, UserProfile} from "../models/AuthUser";
import {fakerService} from "./fakerService";
import {ErrorResponse} from "../interfaces/Service";

export const signInWithLoginAndPassword = async (login: string, password: string): Promise<AuthUser | ErrorResponse> => await fakerService.authUser();
export const signOut = async (): Promise<boolean | ErrorResponse> => true;
export const updateUserProfile = async (changes: UserProfile): Promise<boolean | ErrorResponse> => true;
