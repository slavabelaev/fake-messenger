import React from 'react';
import List from "@material-ui/core/List";
import MessageListItem, {MessageListItemProps} from "./MessageListItem";

export interface MessageListProps {
    itemCount: number;
    getItem: (index: number) => MessageListItemProps;
}

function MessageList(props: MessageListProps) {
    const renderItem = (_: null, index: number) => (
        <MessageListItem
            key={index}
            {...props.getItem(index)}
        />
    );

    return (
        <List>
            {Array(props.itemCount).fill(null).map(renderItem)}
        </List>
    );
}

export default MessageList;
