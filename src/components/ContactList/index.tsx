import React, {useEffect} from "react";
import ContactList from "./ContactList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchContacts} from "./contactsSlice";
import {Contact} from "../../models/Contact";
import {ContactListItemProps} from "./ContactListItem";
import {CHAT_ROUTE_PATH} from "../../views/Chat";

export const mapContactToItemProps = (contact: Contact): ContactListItemProps => ({
    fullName: `${contact.firstName} ${contact.lastName}`,
    avatarSrc: contact.avatarUrl,
    lastMessage: contact.lastMessage.text,
    to: CHAT_ROUTE_PATH.replace(':id', contact.id)
});

const getContactsFilter = (searchQuery: string) => (item: Contact) => {
    return (
        item.firstName.toLowerCase().includes(searchQuery) ||
        item.lastName.toLowerCase().includes(searchQuery)
    )
};

function ContactListContainer() {
    const { items, searchQuery, error, loading } = useSelector(({ contacts }: RootState) => contacts);
    const filter = getContactsFilter(searchQuery);
    const contacts = searchQuery ? items.filter(filter) : items;
    const dispatch = useDispatch();

    useEffect(() => {
        fetchContacts()(dispatch);
    }, [dispatch]);

    if (error) return (
        <Typography>
            Error on fetch contacts
        </Typography>
    );

    if (loading) return (
        <CircularProgress />
    );

    return (
        <ContactList
            itemCount={contacts.length}
            getItem={index => mapContactToItemProps(contacts[index])}
        />
    )
}

export default ContactListContainer;
