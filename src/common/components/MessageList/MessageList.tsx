import React, {Key} from 'react';
import MessageListItem, {MessageListItemProps} from "./MessageListItem";
import ListView from "../ListView";

export interface MessageListProps {
    itemCount: number;
    getItem: (index: number) => MessageListItemProps;
    getItemKey?: (index: number) => Key;
}

function MessageList({
    itemCount,
    getItem,
    getItemKey
}: MessageListProps) {
    const renderItem = (index: number) => {
        const itemProps = getItem(index);
        const itemKey = getItemKey ? getItemKey(index) : index;
        return (
            <MessageListItem
                key={itemKey}
                {...itemProps}
            />
        )
    };

    return (
        <ListView
            itemCount={itemCount}
            renderItem={renderItem}
        />
    );
}

export default MessageList;
