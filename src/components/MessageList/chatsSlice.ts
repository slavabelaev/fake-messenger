import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../models/Message";
import {Dispatch} from "react";
import {removeMessages, fetchMessages, addMessage} from "../../services/messageService";
import {Chat} from "../../models/Chat";
import {RootState} from "../../app/rootReducer";
import {ErrorResponse, FetchList} from "../../interfaces/Service";
import {User} from "../../models/User";
import {setStatusError} from "../../app/statusSlice";

export interface ChatMessagesState {
    messages: Message[] | null;
    checkedIds: Message['id'][];
    searchQuery: string;
    checkModeEnabled: boolean;
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
        setSearchQuery(state, action: PayloadAction<{
            chatId: Chat['id'];
            searchQuery: string;
        }>) {
            const { chatId, searchQuery } = action.payload;
            state[chatId].searchQuery = searchQuery;
        },
        add(state, action: PayloadAction<Message>) {
            const chatId = action.payload.createdBy as NonNullable<Message['createdBy']>;
            const message = action.payload;
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
        }
    }
});

export const selectChatMessages = (id?: Chat['id']) => (state: RootState): ChatMessagesState => {
    if (!id) return itemInitialState;
    return state.chats[id] || itemInitialState;
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
    toggleCheck: toggleCheckMessage
} = chatsSlice.actions;

export const addMessageAsync = (createdBy: User['id'], messageText: Message['text']) => (dispatch: Dispatch<any>) => {
    addMessage(createdBy, messageText)
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const message = response as Message;
            const action = addOneMessage(message);
            dispatch(action);
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
