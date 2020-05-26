import React, {useEffect} from "react";
import ContactList from "../../common/components/ContactList/ContactList";
import {useDispatch, useSelector} from "react-redux";
import {contactsRequest, selectContacts, selectFoundContacts} from "./contactsSlice";
import {Contact} from "./Contact";
import {ContactListItemProps} from "../../common/components/ContactList/ContactListItem";
import {CHAT_ROUTE_PATH} from "../chat/ChatPage";
import ErrorMessage from "../../common/components/layout/ErrorMessage";
import Loading from "../../common/components/layout/Loading";
import Empty from "../../common/components/layout/Empty";

export const mapContactToItemProps = (contact: Contact): ContactListItemProps => {
    const to = CHAT_ROUTE_PATH.replace(':id', contact.id);
    return {
        fullName: `${contact.firstName} ${contact.lastName}`,
        avatarSrc: contact.avatarUrl,
        lastMessage: {
            text: contact.lastMessage.text,
            delivered: contact.lastMessage.delivered,
            read: contact.lastMessage.read,
            createdAt: contact.lastMessage.createdAt
        },
        isOnline: contact.isOnline,
        toProfile: to + '/profile',
        to
    }
};

function ContactListContainer() {
    const contacts = useSelector(selectFoundContacts);
    const {error, loading} = useSelector(selectContacts);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = contactsRequest();
        dispatch(action);
    }, [dispatch]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage/>;
    if (!contacts.length) return <Empty/>;

    return (
        <ContactList
            itemCount={contacts.length}
            getItemKey={index => contacts[index].id}
            getItem={index => mapContactToItemProps(contacts[index])}
        />
    )
}

export default ContactListContainer;
