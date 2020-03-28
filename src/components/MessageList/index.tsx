import React, {useEffect} from 'react';
import MessageList from "./MessageList";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "../../models/Message";
import {Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {fetchMessages, selectContactMessages} from "./messagesSlice";
import {MessageListItemProps} from "./MessageListItem";
import {useParams} from 'react-router-dom';

export interface MessageListContainerProps {}

const mapMessageToItemProps = (message: Message): MessageListItemProps => ({
    text: message?.text
});

const getMessagesFilter = (searchQuery: string) => (item: Message) => {
    return item.text.toLowerCase().includes(searchQuery)
};

function MessageListContainer(props: MessageListContainerProps) {
    const { id: contactId } = useParams();
    const { error, searchQuery, items, loading } = useSelector(selectContactMessages(contactId));
    const messagesFilter = getMessagesFilter(searchQuery);
    const messages = searchQuery ? items.filter(messagesFilter) : items;
    const dispatch = useDispatch();

    useEffect(() => {
        if (contactId && !items.length) fetchMessages(contactId)(dispatch);
    }, [items.length, dispatch, contactId]);

    if (loading) return (
        <CircularProgress/>
    );

    if (error) return (
        <Typography color="error">
            Error
        </Typography>
    );

    return items && (
        <MessageList
            itemCount={messages.length}
            getItem={(index) => mapMessageToItemProps(messages[index])}
        />
    );
}

export default MessageListContainer;
