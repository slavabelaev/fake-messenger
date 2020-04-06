import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthUser, UserProfile} from "../models/AuthUser";
import {signInWithLoginAndPassword, updateUserProfile} from "../services/authService";
import {ErrorResponse} from "../interfaces/Service";
import {Dispatch} from "react";
import {RootState} from "./rootReducer";
import {setStatusError, setStatusMessage} from "./statusSlice";

export interface AuthState {
    loading: boolean;
    error: boolean;
    user: AuthUser | null;
}

const initialState: AuthState = {
    loading: false,
    error: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
            state.error = false;
        },
        success(state, action: PayloadAction<AuthUser>) {
            state.error = false;
            state.loading = false;
            state.user = action.payload;
        },
        failure(state) {
            state.error = true;
            state.loading = false;
        },
        update(state, action: PayloadAction<UserProfile>) {
            const changes = action.payload;
            state.user = state.user ? {
                ...state.user,
                ...changes
            } : null;
        }
    }
});

export const selectAuth = (state: RootState) => state.auth;

export const {
    request: authRequest,
    success: authSuccess,
    failure: authFailure,
    update: updateProfile
} = authSlice.actions;

export const signIn = (login: string, password: string) => (dispatch: Dispatch<any>) => {
    dispatch(authRequest());
    signInWithLoginAndPassword(login, password)
        .then((response) => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw Error(errors[0]);
            const authUser = response as AuthUser;
            const action = authSuccess(authUser);
            dispatch(action);
        })
        .catch(error => {
            const action = authFailure();
            dispatch(action);
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

export const updateUserProfileAsync = (changes: UserProfile) => async (dispatch: Dispatch<any>) => {
    updateUserProfile(changes)
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const action = updateProfile(changes);
            dispatch(action);
            const statusAction = setStatusMessage('Profile updated');
            dispatch(statusAction);
        })
        .catch(error => {
            const action = authFailure();
            dispatch(action);
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

const authReducer = authSlice.reducer;

export default authReducer;
