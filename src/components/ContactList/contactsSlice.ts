import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contact} from "../../models/Contact";
import {findContacts} from "../../services/contactService";
import {Dispatch} from "react";
import {ErrorResponse, FindAllResponse} from "../../interfaces/Service";
import {RootState} from "../../app/rootReducer";

export interface ContactsState {
    items: Contact[];
    searchQuery: string;
    loading: boolean;
    error: boolean;
}

const initialState: ContactsState = {
    items: [],
    searchQuery: '',
    loading: false,
    error: false
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
            state.error = false;
        },
        success(state, action: PayloadAction<Contact[]>) {
            state.error = false;
            state.loading = false;
            state.items = action.payload;
        },
        failure(state) {
            state.error = true;
            state.loading = false;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        switchFavorite(state, action: PayloadAction<Contact['id']>) {
            const contactId = action.payload;
            const index = state.items.findIndex(item => item.id === contactId);
            state.items[index].isFavorite = !state.items[index].isFavorite;
        },
        switchNotifications(state, action: PayloadAction<Contact['id']>) {
            const contactId = action.payload;
            const index = state.items.findIndex(item => item.id === contactId);
            state.items[index].notificationsEnabled = !state.items[index].notificationsEnabled;
        }
    }
});

export const selectContactById = (id?: Contact['id']) => (state: RootState): Contact | undefined => {
    if (!id) return undefined;
    return state.contacts?.items?.find(item => item.id === id);
};

export const {
    request: contactsRequest,
    success: contactsSuccess,
    failure: contactsFailure,
    setSearchQuery: contactsSearchQuery,
    switchFavorite: contactsSwitchFavorite,
    switchNotifications: contactsSwitchNotifications,
} = contactsSlice.actions;

export const fetchContacts = () => (dispatch: Dispatch<any>) => {
    dispatch(contactsRequest());
    findContacts()
        .then(response => {
            const failedResponse = response as ErrorResponse;
            if (failedResponse.errors) throw new Error();
            const successResponse = response as FindAllResponse<Contact>;
            const action = contactsSuccess(successResponse.items);
            dispatch(action);
        })
        .catch(_ => dispatch(contactsFailure()))
};

const contactsReducer = contactsSlice.reducer;

export default contactsReducer;
