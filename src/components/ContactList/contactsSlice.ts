import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contact} from "../../models/Contact";
import {findContacts} from "../../services/contactService";
import {Dispatch} from "react";
import {ErrorResponse, FindAllResponse} from "../../interfaces/Service";
import {RootState} from "../../app/rootReducer";

const contactsAdapter = createEntityAdapter<Contact>();

const initialState = contactsAdapter.getInitialState<{
    searchQuery: string;
    loading: boolean;
    error: boolean;
}>({
    searchQuery: '',
    loading: false,
    error: false
});

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
            contactsAdapter.addMany(state, action.payload);
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
            const isFavorite = state.entities[contactId]?.isFavorite;
            contactsAdapter.updateOne(state, {
                id: contactId,
                changes: {
                    isFavorite: !isFavorite
                }
            });
        },
        switchNotifications(state, action: PayloadAction<Contact['id']>) {
            const contactId = action.payload;
            const notificationsEnabled = state.entities[contactId]?.notificationsEnabled;
            contactsAdapter.updateOne(state, {
                id: contactId,
                changes: {
                    notificationsEnabled: !notificationsEnabled
                }
            });
        }
    }
});

export const {
    selectAll: selectAllContacts,
    selectById: selectContactById
} = contactsAdapter.getSelectors((state: RootState) => state.contacts);
export const selectContactsState = (state: RootState) => state.contacts;
export const getContactByIdSelector = (id: Contact['id']) => (state: RootState) => selectContactById(state, id);

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
