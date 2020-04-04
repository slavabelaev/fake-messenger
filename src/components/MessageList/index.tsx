import React, {ChangeEvent, useEffect, useState} from 'react';
import MessageList, {MessageListProps} from "./MessageList";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "../../models/Message";
import {removeMessagesAsync, fetchMessagesAsync, selectChatMessages} from "./chatsSlice";
import {MessageListItemProps} from "./MessageListItem";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import SendMessageToolbar from "../SendMessageToolbar";
import View from "../../layout/View";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";
import {Chat} from "../../models/Chat";
import {Container, createStyles, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export interface MessageListContainerProps {
    chatId: Chat['id'];
}

const mapMessageToItemProps = (message: Message): MessageListItemProps => {
    const messageFromMe = Math.random() > .5;
    return ({
        key: message.id,
        text: message?.text,
        delivered: message.delivered,
        read: message.read,
        createdAt: message.createdAt,
        direction: messageFromMe ? 'right' : 'left',
        color: messageFromMe ? 'primary' : 'default'
    })
};

const getMessagesFilter = (searchQuery: string) => (item: Message) => {
    const query = searchQuery.toLowerCase();
    return item.text.toLowerCase().includes(query);
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    content: {}
}));

function MessageListContainer({ chatId }: MessageListContainerProps) {
    const classes = useStyles();
    const { error, searchQuery, checkModeEnabled, messages: allMessages, loading } = useSelector(selectChatMessages(chatId));
    const [checkedIds, setCheckedIds] = useState<Message['id'][]>([]);
    const messagesFilter = getMessagesFilter(searchQuery);
    const messages = searchQuery ? allMessages?.filter(messagesFilter) : allMessages;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!allMessages) fetchMessagesAsync(chatId)(dispatch);
    }, [allMessages, dispatch, chatId]);

    if (loading || !messages) return <Loading/>;
    if (error) return <ErrorMessage/>;

    const getItem: MessageListProps['getItem'] = (index) => {
        const message: Message = messages[index];
        const handleChange = (event: ChangeEvent, checked: boolean) => {
            const ids = checked
                ? [...checkedIds, message.id]
                : checkedIds.filter(id => id !== message.id);
            setCheckedIds(ids);
        };

        return {
            ...mapMessageToItemProps(message),
            variant: checkModeEnabled ? 'checkbox' : 'default',
            CheckboxProps: {
                checked: checkedIds.includes(message.id),
                onChange: handleChange
            }
        };
    };

    const messageList = messages.length ? (
        <MessageList
            itemCount={messages.length}
            getItem={getItem}
        />
    ) : null;

    const handleDelete = () => {
        removeMessagesAsync(chatId, checkedIds)(dispatch);
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
        <SendMessageToolbar
            chatId={chatId}
        />
    );

    return (
        <View
            footer={toolbar}
            className={classes.content}
        >
            <Container
                maxWidth="sm"
                disableGutters
            >
                {messageList}
            </Container>
        </View>
    );
}

export default MessageListContainer;
