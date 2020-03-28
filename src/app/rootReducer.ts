import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../components/ContactList/contactsSlice";
import messagesReducer from "../components/MessageList/messagesSlice";
import attachmentsReducer from "../components/AttachmentList/attachmentsSlice";
import authSlice from "./authSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    messages: messagesReducer,
    attachments: attachmentsReducer,
    auth: authSlice
});

export type RootState = ReturnType<typeof rootReducer>;
