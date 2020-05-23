import {AuthUser, UserProfile} from "./AuthUser";
import {ErrorResponse} from "../../common/interfaces/Service";
import {generateAuthUser} from "./generateAuthUser";

export const signInWithLoginAndPassword = async (login: string, password: string): Promise<AuthUser | ErrorResponse> => await generateAuthUser();
export const signOut = async (): Promise<boolean | ErrorResponse> => true;
export const updateUserProfile = async (changes: UserProfile): Promise<boolean | ErrorResponse> => true;
