import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../models/Message";
import {Dispatch} from "react";
import {deleteMessages, findMessages, insertMessage} from "../../services/messageService";
import {Contact} from "../../models/Contact";
import {RootState} from "../../app/rootReducer";
import {ErrorResponse, FindAllResponse} from "../../interfaces/Service";
import {User} from "../../models/User";

export interface ContactMessagesState {
    items: Message[];
    searchQuery: string;
    loading: boolean;
    error: boolean;
}

export interface MessagesState {
    [contactId: string]: ContactMessagesState
}

const initialState: MessagesState = {};
const itemInitialState: ContactMessagesState = {
    items: [],
    searchQuery: '',
    loading: false,
    error: false
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        request(state, action: PayloadAction<{
            contactId: Contact['id'];
        }>) {
            const { contactId } = action.payload;
            if (!state[contactId]) state[contactId] = {...itemInitialState};
            state[contactId].loading = true;
            state[contactId].error = false;
        },
        success(state, action: PayloadAction<{
            contactId: Contact['id'];
            items: Message[];
        }>) {
            const { contactId, items } = action.payload;
            state[contactId].error = false;
            state[contactId].loading = false;
            state[contactId].items = items;
        },
        failure(state, action: PayloadAction<{
            contactId: Contact['id'];
        }>) {
            const { contactId } = action.payload;
            state[contactId].error = true;
            state[contactId].loading = false;
        },
        setSearchQuery(state, action: PayloadAction<{
            contactId: Contact['id'];
            searchQuery: string;
        }>) {
            const { contactId, searchQuery } = action.payload;
            state[contactId].searchQuery = searchQuery;
        },
        add(state, action: PayloadAction<Message>) {
            const contactId = action.payload.createdBy as NonNullable<Message['createdBy']>;
            const message = action.payload;
            state[contactId].items.push(message);
        },
        deleteMany(state, action: PayloadAction<{
            contactId: Contact['id'];
            messageIds: Message['id'][];
        }>) {
            const { contactId, messageIds } = action.payload;
            state[contactId].items = state[contactId].items.filter(item => !messageIds.includes(item.id));
        }
    }
});

export const selectContactMessages = (id?: Contact['id']) => (state: RootState): ContactMessagesState => {
    if (!id) return itemInitialState;
    return state.messages[id] || itemInitialState;
};

export const {
    request: messagesRequest,
    success: messagesSuccess,
    failure: messagesFailure,
    setSearchQuery: messagesSearchQuery,
    add: addMessage,
    deleteMany: deleteManyMessages
} = messagesSlice.actions;

export const insertMessageAsync = (createdBy: User['id'], messageText: Message['text']) => (dispatch: Dispatch<any>) => {
    insertMessage(createdBy, messageText)
        .then(response => {
            const successResponse = response as Message;
            const action = addMessage(successResponse);
            dispatch(action);
        })
};

export const deleteMessagesAsync = (contactId: Contact['id'], messageIds: Message['id'][]) => (dispatch: Dispatch<any>) => {
    deleteMessages(messageIds)
        .then((response) => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw Error();
            const action = deleteManyMessages({contactId, messageIds});
            dispatch(action);
        })
        .catch(console.log)
};

export const fetchMessagesAsync = (contactId: Contact['id']) => (dispatch: Dispatch<any>) => {
    dispatch(messagesRequest({contactId}));
    findMessages()
        .then(response => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw new Error();
            const successResponse = response as FindAllResponse<Message>;
            const action = messagesSuccess({
                contactId,
                items: successResponse.items
            });
            dispatch(action);
        })
        .catch(_ => {
            dispatch(messagesFailure({contactId}));
        })
};

const messagesReducer = messagesSlice.reducer;

export default messagesReducer;
