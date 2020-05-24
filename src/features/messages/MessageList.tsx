import React, {ChangeEvent, useEffect} from 'react';
import MessageList, {MessageListProps} from "../../common/components/MessageList/MessageList";
import {useDispatch, useSelector} from "react-redux";
import {Message} from "./Message";
import {toggleCheckMessage, selectChatById, fetchMessagesRequest} from "../chat/chatsSlice";
import {MessageListItemProps} from "../../common/components/MessageList/MessageListItem";
import ErrorMessage from "../../common/components/layout/ErrorMessage";
import Loading from "../../common/components/layout/Loading";
import {Chat} from "../chat/Chat";

export interface MessageListContainerProps {
    chatId: Chat['id'];
}

const mapMessageToItemProps = (message: Message): MessageListItemProps => ({
    text: message?.text,
    delivered: message.delivered,
    read: message.read,
    createdAt: message.createdAt,
    direction: message.createdByMe ? 'right' : 'left',
    color: message.createdByMe ? 'primary' : 'default'
});

const getMessagesFilter = (searchQuery: string) => (item: Message) => {
    const query = searchQuery.toLowerCase();
    return item.text.toLowerCase().includes(query);
};

function MessageListContainer({ chatId }: MessageListContainerProps) {
    const { error, searchQuery, checkModeEnabled, checkedIds, messages: allMessages, loading } = useSelector(selectChatById(chatId));
    const messagesFilter = getMessagesFilter(searchQuery);
    const messages = searchQuery ? allMessages?.filter(messagesFilter) : allMessages;
    const messagesFetched = Boolean(allMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!messagesFetched) {
            const action = fetchMessagesRequest({chatId});
            dispatch(action);
        }
    }, [messagesFetched, dispatch, chatId]);

    if (loading || !messages) return <Loading/>;
    if (error) return <ErrorMessage/>;

    const getItem: MessageListProps['getItem'] = (index) => {
        const message: Message = messages[index];
        const handleChange = (event: ChangeEvent, checked: boolean) => {
            const action = toggleCheckMessage({
                chatId,
                messageId: message.id
            });
            dispatch(action);
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

    return messages.length ? (
        <MessageList
            itemCount={messages.length}
            getItem={getItem}
            getItemKey={index => messages[index].id}
        />
    ) : null;
}

export default MessageListContainer;
