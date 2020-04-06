import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthUser, UserProfile} from "../models/AuthUser";
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
        request(state, action: PayloadAction<{
            login: string;
            password: string;
        }>) {
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

const authReducer = authSlice.reducer;

export default authReducer;
