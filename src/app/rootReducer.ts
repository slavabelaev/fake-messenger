import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contactsSlice";
import chatsReducer from "../features/chat/chatsSlice";
import authSlice from "../features/auth/authSlice";
import settingsReducer from "../features/settings/settingsSlice";
import statusReducer from "./statusSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    chats: chatsReducer,
    auth: authSlice,
    settings: settingsReducer,
    status: statusReducer
});

export type RootState = ReturnType<typeof rootReducer>;
