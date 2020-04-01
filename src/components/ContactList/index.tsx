import React, {useEffect} from "react";
import ContactList from "./ContactList";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {fetchContacts} from "./contactsSlice";
import {Contact} from "../../models/Contact";
import {ContactListItemProps} from "./ContactListItem";
import {CHAT_ROUTE_PATH} from "../../views/Chat";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";

export const mapContactToItemProps = (contact: Contact): ContactListItemProps => ({
    key: contact.id,
    fullName: `${contact.firstName} ${contact.lastName}`,
    avatarSrc: contact.avatarUrl,
    lastMessage: contact.lastMessage.text,
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
    const { items, searchQuery, error, loading } = useSelector(({ contacts }: RootState) => contacts);
    const filter = getContactsFilter(searchQuery);
    const contacts = searchQuery ? items.filter(filter) : items;
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
