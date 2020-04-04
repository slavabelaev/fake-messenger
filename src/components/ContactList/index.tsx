import React, {useEffect} from "react";
import ContactList from "./ContactList";
import {useDispatch, useSelector} from "react-redux";
import {fetchContactsAsync, selectContacts, selectFoundContacts, removeContactAsync} from "./contactsSlice";
import {Contact} from "../../models/Contact";
import {ContactListItemProps} from "./ContactListItem";
import {CHAT_ROUTE_PATH} from "../../views/Chat";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";

export const mapContactToItemProps = (contact: Contact): ContactListItemProps => ({
    fullName: `${contact.firstName} ${contact.lastName}`,
    avatarSrc: contact.avatarUrl,
    lastMessage: {
        text: contact.lastMessage.text,
        delivered: contact.lastMessage.delivered,
        read: contact.lastMessage.read
    },
    isOnline: contact.isOnline,
    inBlackList: contact.inBlackList,
    to: CHAT_ROUTE_PATH.replace(':id', contact.id)
});

function ContactListContainer() {
    const contacts = useSelector(selectFoundContacts);
    const {error, loading} = useSelector(selectContacts);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchContactsAsync()(dispatch);
    }, [dispatch]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <ContactList
            itemCount={contacts.length}
            getItemKey={index => contacts[index].id}
            getItem={index => {
                const contact = contacts[index];
                const itemProps = mapContactToItemProps(contact);
                const handleDelete = () => removeContactAsync(contact.id)(dispatch);
                return {
                    ...itemProps,
                    onDelete: handleDelete
                };
            }}
        />
    )
}

export default ContactListContainer;
