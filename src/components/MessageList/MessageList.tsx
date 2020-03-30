import React from 'react';
import List from "@material-ui/core/List";
import MessageListItem, {MessageListItemProps} from "./MessageListItem";

export interface MessageListProps {
    itemCount: number;
    getItem: (index: number) => MessageListItemProps;
}

function MessageList({
    itemCount,
    getItem
}: MessageListProps) {
    const renderItem = (_: null, index: number) => (
        <MessageListItem
            key={index}
            {...getItem(index)}
        />
    );

    return (
        <List>
            {Array(itemCount).fill(null).map(renderItem)}
        </List>
    );
}

export default MessageList;
