import React, {Key} from 'react';
import LinkListItem, {AttachmentLinkListItemProps} from "./LinkListItem";
import ListView from "../ListView";

export interface AttachmentLinkListProps {
    itemCount: number;
    getItem: (index: number) => AttachmentLinkListItemProps;
    getItemKey?: (index: number) => Key;
}

function LinkList({
    itemCount,
    getItem,
    getItemKey
}: AttachmentLinkListProps) {
    const renderItem = (index: number) => {
        const itemProps = getItem(index);
        const itemKey = getItemKey ? getItemKey(index) : index;
        return (
            <LinkListItem
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

export default LinkList;
