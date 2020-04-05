import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import chatsReducer from "./chatsSlice";
import authSlice from "./authSlice";
import settingsReducer from "./settingsSlice";
import statusReducer from "./statusSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    chats: chatsReducer,
    auth: authSlice,
    settings: settingsReducer,
    status: statusReducer
});

export type RootState = ReturnType<typeof rootReducer>;
