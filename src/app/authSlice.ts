import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthUser} from "../models/AuthUser";
import {signInWithLoginAndPassword} from "../services/authService";
import {ErrorResponse} from "../interfaces/Service";
import {Dispatch} from "react";
import {RootState} from "./rootReducer";

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
    }
});

export const authSelector = (state: RootState) => state.auth;

export const {
    request: authRequest,
    success: authSuccess,
    failure: authFailure
} = authSlice.actions;

export const signIn = (login: string, password: string) => (dispatch: Dispatch<any>) => {
    signInWithLoginAndPassword(login, password)
        .then((response) => {
            const failureResponse = response as ErrorResponse;
            if (failureResponse.errors) throw Error();
            const successResponse = response as AuthUser;
            const action = authSuccess(successResponse);
            dispatch(action);
        })
        .catch(err => {
            const action = authFailure();
            dispatch(action);
        })
};

const authReducer = authSlice.reducer;

export default authReducer;
