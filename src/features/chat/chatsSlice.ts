import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../messages/Message";
import {Chat} from "./Chat";
import {RootState} from "../../app/rootReducer";
import {Attachment} from "../attachments/Attachment";
import {AttachmentLink} from "../links/AttachmentLink";

export interface ChatMessagesState {
    messages: Message[] | null;
    checkedIds: Message['id'][];
    searchQuery: string;
    checkModeEnabled: boolean;
    prints: boolean;
    loading: boolean;
    error: boolean;
}

export interface MessagesState {
    [chatId: string]: ChatMessagesState
}

const initialState: MessagesState = {};
export const itemInitialState: ChatMessagesState = {
    messages: null,
    checkedIds: [],
    searchQuery: '',
    prints: false,
    checkModeEnabled: false,
    loading: false,
    error: false
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        fetchRequest: (state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) => {
            const { chatId } = action.payload;
            if (!state[chatId]) state[chatId] = {...itemInitialState};
            state[chatId].loading = true;
            state[chatId].error = false;
        },
        fetchSuccess(state, action: PayloadAction<{
            chatId: Chat['id'];
            messages: Message[];
        }>) {
            const { chatId, messages } = action.payload;
            state[chatId].error = false;
            state[chatId].loading = false;
            state[chatId].messages = messages;
        },
        fetchFailure(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const { chatId } = action.payload;
            state[chatId].error = true;
            state[chatId].loading = false;
        },
        setPrints(state, action: PayloadAction<{
            chatId: Chat['id'];
            prints: boolean;
        }>) {
            const { chatId, prints } = action.payload;
            state[chatId].prints = prints;
        },
        setSearchQuery(state, action: PayloadAction<{
            chatId: Chat['id'];
            searchQuery: string;
        }>) {
            const { chatId, searchQuery } = action.payload;
            state[chatId].searchQuery = searchQuery;
        },
        switchCheckMode(state, action: PayloadAction<{
            chatId: Chat['id'];
            enabled?: boolean;
        }>) {
            const { chatId, enabled } = action.payload;
            const chat = state[chatId];
            const checkModeEnabled = enabled !== undefined
                ? enabled
                : !chat.checkModeEnabled;
            chat.checkModeEnabled = checkModeEnabled;
            if (!checkModeEnabled) chat.checkedIds = [];
        },
        addMessageRequest(state, action: PayloadAction<{
            chatId: Chat['id'];
            messageText: string;
        }>) {

        },
        addMessageSuccess(state, action: PayloadAction<{
            chatId: Chat['id'];
            message: Message;
        }>) {
            const {chatId, message} = action.payload;
            let messages = state[chatId].messages;
            if (!messages) messages = [];
            messages.push(message);
        },
        removeMessagesSuccess(state, action: PayloadAction<{
            chatId: Chat['id'];
            messageIds?: Message['id'][];
        }>) {
            const { chatId, messageIds } = action.payload;
            const chat = state[chatId];
            if (messageIds) {
                chat.messages = (chat.messages || []).filter(item => !messageIds.includes(item.id));
            } else {
                chat.messages = [];
            }
            chat.checkedIds = [];
            chat.checkModeEnabled = false;
        },
        toggleCheck(state, action: PayloadAction<{
            chatId: Chat['id'];
            messageId: Message['id'];
        }>) {
            const {chatId, messageId} = action.payload;
            const chat = state[chatId];
            const checked = chat.checkedIds.includes(messageId);
            if (checked) chat.checkedIds = chat.checkedIds.filter(id => id !== messageId);
            else chat.checkedIds.push(messageId);
        },
        removeAttachmentsSuccess(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const {chatId} = action.payload;
            const chat = state[chatId];
            chat.messages?.forEach(item => item.attachmentFile = undefined);
        },
        removeLinksSuccess(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const {chatId} = action.payload;
            const chat = state[chatId];
            chat.messages?.forEach(item => item.attachmentLink = undefined);
        }
    }
});

export const selectChatById = (id: Chat['id']) => (state: RootState): ChatMessagesState => {
    return state.chats[id] || itemInitialState;
};

export const selectChatAttachmentsById = (id: Chat['id']) => (state: RootState): Attachment[] | null => {
    const chat = state.chats[id];
    if (!chat || !chat.messages) return null;

    const messagesWithAttachments = chat.messages?.filter(item => item.attachmentFile !== undefined);
    const attachments = messagesWithAttachments?.map(item => item.attachmentFile);
    return attachments as Attachment[];
};

export const selectChatLinksById = (id: Chat['id']) => (state: RootState): AttachmentLink[] | null => {
    const chat = state.chats[id];
    if (!chat || !chat.messages) return null;

    const messagesWithAttachments = chat.messages?.filter(item => item.attachmentLink !== undefined);
    const attachments = messagesWithAttachments?.map(item => item.attachmentLink);
    return attachments as AttachmentLink[];
};

export const {
    fetchRequest: fetchMessagesRequest,
    fetchSuccess: fetchMessagesSuccess,
    fetchFailure: fetchMessagesFailure,
    removeMessagesSuccess,
    addMessageRequest,
    addMessageSuccess,
    removeAttachmentsSuccess,
    removeLinksSuccess,
    toggleCheck: toggleCheckMessage,
    setSearchQuery: messagesSearchQuery,
    switchCheckMode: switchMessagesCheckMode,
    setPrints: setMessagePrints
} = chatsSlice.actions;

const chatsReducer = chatsSlice.reducer;

export default chatsReducer;
