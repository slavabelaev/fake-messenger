import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../models/Message";
import {Dispatch} from "react";
import {removeMessages, fetchMessages, addMessage} from "../services/messageService";
import {Chat} from "../models/Chat";
import {RootState} from "./rootReducer";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {setStatusError} from "./statusSlice";
import {Attachment} from "../models/Attachment";
import {AttachmentLink} from "../models/AttachmentLink";
import {fakerService} from "../services/fakerService";

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
const itemInitialState: ChatMessagesState = {
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
        request(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const { chatId } = action.payload;
            if (!state[chatId]) state[chatId] = {...itemInitialState};
            state[chatId].loading = true;
            state[chatId].error = false;
        },
        success(state, action: PayloadAction<{
            chatId: Chat['id'];
            messages: Message[];
        }>) {
            const { chatId, messages } = action.payload;
            state[chatId].error = false;
            state[chatId].loading = false;
            state[chatId].messages = messages;
        },
        failure(state, action: PayloadAction<{
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
        add(state, action: PayloadAction<{
            chatId: Chat['id'];
            message: Message;
        }>) {
            const {chatId, message} = action.payload;
            let messages = state[chatId].messages;
            if (!messages) messages = [];
            messages.push(message);
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
        removeMany(state, action: PayloadAction<{
            chatId: Chat['id'];
            messageIds: Message['id'][];
        }>) {
            const { chatId, messageIds } = action.payload;
            const chat = state[chatId];
            chat.messages = (chat.messages || []).filter(item => !messageIds.includes(item.id));
            chat.checkedIds = [];
            chat.checkModeEnabled = false;
        },
        removeAll(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const {chatId} = action.payload;
            const chat = state[chatId];
            chat.messages = [];
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
        removeAttachmentFiles(state, action: PayloadAction<{
            chatId: Chat['id'];
        }>) {
            const {chatId} = action.payload;
            const chat = state[chatId];
            chat.messages?.forEach(item => item.attachmentFile = undefined);
        },
        removeAttachmentLinks(state, action: PayloadAction<{
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

export const selectChatByIdAttachments = (id: Chat['id']) => (state: RootState): Attachment[] => {
    const chat = state.chats[id];
    if (!chat) return [];

    const messagesWithAttachments = chat.messages?.filter(item => item.attachmentFile !== undefined);
    const attachments = messagesWithAttachments?.map(item => item.attachmentFile);
    return attachments as Attachment[];
};

export const selectChatByIdAttachmentLinks = (id: Chat['id']) => (state: RootState): AttachmentLink[] => {
    const chat = state.chats[id];
    if (!chat) return [];

    const messagesWithAttachments = chat.messages?.filter(item => item.attachmentLink !== undefined);
    const attachments = messagesWithAttachments?.map(item => item.attachmentLink);
    return attachments as AttachmentLink[];
};

export const {
    request: messagesRequest,
    success: messagesSuccess,
    failure: messagesFailure,
    setSearchQuery: messagesSearchQuery,
    add: addOneMessage,
    switchCheckMode: switchMessagesCheckMode,
    removeMany: removeManyMessages,
    removeAll: removeAllMessages,
    toggleCheck: toggleCheckMessage,
    removeAttachmentFiles,
    removeAttachmentLinks,
    setPrints: setMessagePrints
} = chatsSlice.actions;

export const sendFakeAnswerAsync = (chatId: Chat['id']) => (dispatch: Dispatch<any>) => {
    const message = fakerService.message();
    message.createdBy = chatId;
    message.createdByMe = false;
    message.createdAt = new Date();
    message.attachmentLink = undefined;
    message.attachmentFile = undefined;
    message.read = true;
    message.delivered = true;
    const timeout = message.text.length * (Math.random() * 10 + 5);
    const startPrintsTimeout = (Math.random() * 2000 + 1000);

    const startMessageAwait = () => setTimeout(() => {
        const action = addOneMessage({chatId, message});
        dispatch(action);
        const messagePrintsAction = setMessagePrints({chatId, prints: false});
        dispatch(messagePrintsAction);
    }, timeout);

    setTimeout(() => {
        const action = setMessagePrints({chatId, prints: true});
        dispatch(action);
        startMessageAwait();
    }, startPrintsTimeout);
};

export const addMessageAsync = (chatId: Chat['id'], messageText: Message['text']) => (dispatch: Dispatch<any>) => {
    addMessage(chatId, messageText)
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const message = response as Message;
            const action = addOneMessage({chatId, message});
            dispatch(action);
            // Send fake answer
            sendFakeAnswerAsync(chatId)(dispatch);
        })
        .catch(error => {
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

export const removeMessagesAsync = (chatId: Chat['id'], messageIds?: Message['id'][]) => (dispatch: Dispatch<any>) => {
    removeMessages(messageIds)
        .then((response) => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);

            const action = (messageIds?.length)
                ? removeManyMessages({chatId, messageIds})
                : removeAllMessages({chatId});
            dispatch(action);
        })
        .catch(error => {
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

export const fetchMessagesAsync = (chatId: Chat['id']) => (dispatch: Dispatch<any>) => {
    const action = messagesRequest({chatId});
    dispatch(action);
    fetchMessages()
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const messages = (response as FetchList<Message>).items;
            const action = messagesSuccess({chatId, messages});
            dispatch(action);
        })
        .catch(error => {
            const action = messagesFailure({chatId});
            dispatch(action);
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

const chatsReducer = chatsSlice.reducer;

export default chatsReducer;
