import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../components/ContactList/contactsSlice";
import chatsReducer from "../components/MessageList/chatsSlice";
import authSlice from "./authSlice";
import settingsReducer from "../components/SettingList/settingsSlice";
import statusReducer from "./statusSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    chats: chatsReducer,
    auth: authSlice,
    settings: settingsReducer,
    status: statusReducer
});

export type RootState = ReturnType<typeof rootReducer>;
