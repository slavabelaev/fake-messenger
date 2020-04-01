import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../models/Message";
import {Dispatch} from "react";
import {deleteMessages, findMessages, insertMessage} from "../../services/messageService";
import {Chat} from "../../models/Chat";
import {RootState} from "../../app/rootReducer";
import {ErrorResponse, FindAllResponse} from "../../interfaces/Service";
import {User} from "../../models/User";

export interface ChatMessagesState {
    items: Message[];
    searchQuery: string;
    loading: boolean;
    error: boolean;
}

export interface MessagesState {
    [chatId: string]: ChatMessagesState
}

const initialState: MessagesState = {};
const itemInitialState: ChatMessagesState = {
    items: [],
    searchQuery: '',
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
            items: Message[];
        }>) {
            const { chatId, items } = action.payload;
            state[chatId].error = false;
            state[chatId].loading = false;
            state[chatId].items = items;
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
            state[chatId].items.push(message);
        },
        deleteMany(state, action: PayloadAction<{
            chatId: Chat['id'];
            messageIds: Message['id'][];
        }>) {
            const { chatId, messageIds } = action.payload;
            state[chatId].items = state[chatId].items.filter(item => !messageIds.includes(item.id));
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
    add: addMessage,
    deleteMany: deleteManyMessages
} = chatsSlice.actions;

export const insertMessageAsync = (createdBy: User['id'], messageText: Message['text']) => (dispatch: Dispatch<any>) => {
    insertMessage(createdBy, messageText)
        .then(response => {
            const successResponse = response as Message;
            const action = addMessage(successResponse);
            dispatch(action);
        })
};

export const deleteMessagesAsync = (chatId: Chat['id'], messageIds: Message['id'][]) => (dispatch: Dispatch<any>) => {
    deleteMessages(messageIds)
        .then((response) => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw Error();
            const action = deleteManyMessages({chatId, messageIds});
            dispatch(action);
        })
        .catch(console.log)
};

export const fetchMessagesAsync = (chatId: Chat['id']) => (dispatch: Dispatch<any>) => {
    dispatch(messagesRequest({chatId}));
    findMessages()
        .then(response => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw new Error();
            const successResponse = response as FindAllResponse<Message>;
            const action = messagesSuccess({
                chatId,
                items: successResponse.items
            });
            dispatch(action);
        })
        .catch(_ => {
            dispatch(messagesFailure({chatId}));
        })
};

const chatsReducer = chatsSlice.reducer;

export default chatsReducer;
