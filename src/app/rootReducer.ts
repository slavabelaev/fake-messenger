import {combineReducers} from "@reduxjs/toolkit";
import contactsReducer from "../components/ContactList/contactsSlice";
import chatsReducer from "../components/MessageList/chatsSlice";
import attachmentsReducer from "../components/AttachmentList/attachmentsSlice";
import authSlice from "./authSlice";
import settingsReducer from "../components/SettingList/settingsSlice";
import attachmentLinksReducer from "../components/AttachmentLinkList/attachmentLinksSlice";
import statusReducer from "./statusSlice";

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    chats: chatsReducer,
    attachments: attachmentsReducer,
    attachmentLinks: attachmentLinksReducer,
    auth: authSlice,
    settings: settingsReducer,
    status: statusReducer
});

export type RootState = ReturnType<typeof rootReducer>;
