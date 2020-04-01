import React, {useEffect} from "react";
import ContactList from "./ContactList";
import {useDispatch, useSelector} from "react-redux";
import {fetchContacts, selectAllContacts, selectContactsState} from "./contactsSlice";
import {Contact} from "../../models/Contact";
import {ContactListItemProps} from "./ContactListItem";
import {CHAT_ROUTE_PATH} from "../../views/Chat";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";

export const mapContactToItemProps = (contact: Contact): ContactListItemProps => ({
    key: contact.id,
    fullName: `${contact.firstName} ${contact.lastName}`,
    avatarSrc: contact.avatarUrl,
    lastMessage: {
        text: contact.lastMessage.text,
        delivered: contact.lastMessage.delivered,
        read: contact.lastMessage.read
    },
    isOnline: contact.isOnline,
    to: CHAT_ROUTE_PATH.replace(':id', contact.id)
});

const getContactsFilter = (searchQuery: string) => (item: Contact) => {
    const query = searchQuery.toLowerCase();
    return (
        item.firstName.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query)
    )
};

function ContactListContainer() {
    const allContacts = useSelector(selectAllContacts);
    const {error, loading, searchQuery} = useSelector(selectContactsState);
    const filter = getContactsFilter(searchQuery);
    const contacts = searchQuery ? allContacts.filter(filter) : allContacts;
    const dispatch = useDispatch();

    useEffect(() => {
        fetchContacts()(dispatch);
    }, [dispatch]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <ContactList
            itemCount={contacts.length}
            getItem={index => mapContactToItemProps(contacts[index])}
        />
    )
}

export default ContactListContainer;
