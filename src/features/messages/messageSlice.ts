import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "./Message";

const messagesAdapter = createEntityAdapter<Message>();

const initialState = messagesAdapter.getInitialState<{
    searchQuery: string;
    loading: boolean;
    error: boolean;
}>({
    searchQuery: '',
    loading: false,
    error: false
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
            state.error = false;
        },
        success(state, action: PayloadAction<Message[]>) {
            state.error = false;
            state.loading = false;
            messagesAdapter.addMany(state, action.payload);
        },
        failure(state) {
            state.error = true;
            state.loading = false;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        }
    }
});

export default messagesSlice.reducer;