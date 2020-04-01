import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../components/ContactList/contactsSlice";
import messagesReducer from "../components/MessageList/messagesSlice";
import attachmentsReducer from "../components/AttachmentList/attachmentsSlice";
import authSlice from "./authSlice";
import settingsReducer from "../components/SettingList/settingsSlice";
import attachmentLinksReducer from "../components/AttachmentLinkList/attachmentLinksSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    messages: messagesReducer,
    attachments: attachmentsReducer,
    attachmentLinks: attachmentLinksReducer,
    auth: authSlice,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
