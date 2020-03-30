import React, {ChangeEvent, useEffect, useState} from 'react';
import MessageList, {MessageListProps} from "./MessageList";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "../../models/Message";
import {Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {deleteMessagesAsync, fetchMessagesAsync, selectContactMessages} from "./messagesSlice";
import {MessageListItemProps} from "./MessageListItem";
import {useParams} from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import SendMessageToolbar from "../SendMessageToolbar";
import View from "../../layout/View";

export interface MessageListContainerProps {}

const mapMessageToItemProps = (message: Message): MessageListItemProps => ({
    key: message.id,
    text: message?.text,
    createdAt: message.createdAt
});

const getMessagesFilter = (searchQuery: string) => (item: Message) => {
    return item.text.toLowerCase().includes(searchQuery)
};

function MessageListContainer(props: MessageListContainerProps) {
    const { id: contactId } = useParams();
    const { error, searchQuery, items, loading } = useSelector(selectContactMessages(contactId));
    const [checkedIds, setCheckedIds] = useState<Message['id'][]>([]);
    const messagesFilter = getMessagesFilter(searchQuery);
    const messages = searchQuery ? items.filter(messagesFilter) : items;
    const dispatch = useDispatch();

    useEffect(() => {
        if (contactId && !items.length) fetchMessagesAsync(contactId)(dispatch);
    }, [items.length, dispatch, contactId]);

    if (loading) return (
        <CircularProgress/>
    );

    if (error) return (
        <Typography color="error">
            Error
        </Typography>
    );

    const getItem: MessageListProps['getItem'] = (index) => {
        const message = messages[index];
        const handleChange = (event: ChangeEvent, checked: boolean) => {
            const ids = checked
                ? [...checkedIds, message.id]
                : checkedIds.filter(id => id !== message.id);
            setCheckedIds(ids);
        };

        return {
            ...mapMessageToItemProps(message),
            variant: 'checkbox',
            CheckboxProps: {
                checked: checkedIds.includes(message.id),
                onChange: handleChange
            }
        };
    };

    const messageList = items.length ? (
        <MessageList
            itemCount={messages.length}
            getItem={getItem}
        />
    ) : null;

    const handleDelete = () => {
        if (!contactId) return;
        deleteMessagesAsync(contactId, checkedIds)(dispatch);
        setCheckedIds([]);
    };

    const toolbar = checkedIds.length ? (
        <Toolbar>
            <Tooltip
                title="Delete messages"
                placement="right"
            >
                <IconButton
                    onClick={handleDelete}
                >
                    <Delete/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    ) : (
        <SendMessageToolbar/>
    );

    return (
        <View
            footer={toolbar}
        >
            {messageList}
        </View>
    );
}

export default MessageListContainer;
