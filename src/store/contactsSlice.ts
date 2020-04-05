import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contact} from "../models/Contact";
import {removeContact, fetchContacts, addContact} from "../services/contactService";
import {Dispatch} from "react";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {RootState} from "./rootReducer";
import {fakerService} from "../services/fakerService";
import {setStatusMessage, setStatusError} from "./statusSlice";

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
        addOne: contactsAdapter.addOne,
        removeOne: contactsAdapter.removeOne,
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        switchFavorite(state, action: PayloadAction<Contact['id']>) {
            const contactId = action.payload;
            const inBlackList = state.entities[contactId]?.inBlackList;
            contactsAdapter.updateOne(state, {
                id: contactId,
                changes: {
                    inBlackList: !inBlackList
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

export const selectContacts = (state: RootState) => state.contacts;

export const {
    selectAll: selectAllContacts,
    selectById: selectContactById
} = contactsAdapter.getSelectors<RootState>(selectContacts);

export const getContactByIdSelector = (id: Contact['id']) => (state: RootState) => selectContactById(state, id);

export const selectFoundContacts = createSelector(
    selectContacts,
    ({ searchQuery, entities }) => {
        const query = searchQuery.toLowerCase();
        const searchResults = [];
        for (let id in entities) {
            const entity = entities[id];
            if (!entity) continue;
            const match =
                entity.firstName.toLowerCase().includes(query) ||
                entity.lastName.toLowerCase().includes(query);
            if (!match) continue;
            searchResults.push(entity);
        }
        return searchResults;
    }
);

export const {
    request: contactsRequest,
    success: contactsSuccess,
    failure: contactsFailure,
    addOne: addOneContact,
    removeOne: removeContactById,
    setSearchQuery: contactsSearchQuery,
    switchFavorite: contactsSwitchBlackList,
    switchNotifications: contactsSwitchNotifications,
} = contactsSlice.actions;

export const addContactAsync = (id: Contact['id']) => (dispatch: Dispatch<any>) => {
    addContact(id)
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const contact = fakerService.contact();
            const action = addOneContact(contact);
            dispatch(action);
            const statusMessage = `${contact.firstName} ${contact.lastName} added to contacts`;
            const statusAction = setStatusMessage(statusMessage);
            dispatch(statusAction);
        })
        .catch(error => {
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

export const removeContactAsync = (id: Contact['id']) => (dispatch: Dispatch<any>) => {
    removeContact(id)
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const action = removeContactById(id);
            dispatch(action);
        })
        .catch(error => {
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

export const fetchContactsAsync = () => (dispatch: Dispatch<any>) => {
    dispatch(contactsRequest());
    fetchContacts()
        .then(response => {
            const errors = (response as ErrorResponse).errors;
            if (errors) throw new Error(errors[0]);
            const successResponse = response as FetchList<Contact>;
            const action = contactsSuccess(successResponse.items);
            dispatch(action);
        })
        .catch(error => {
            const action = contactsFailure();
            dispatch(action);
            const statusAction = setStatusError(error);
            dispatch(statusAction);
        })
};

const contactsReducer = contactsSlice.reducer;

export default contactsReducer;
