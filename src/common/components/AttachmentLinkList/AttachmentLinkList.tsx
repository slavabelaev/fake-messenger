import React, {Key} from 'react';
import AttachmentLinkListItem, {AttachmentLinkListItemProps} from "./AttachmentLinkListItem";
import ListView from "../ListView";

export interface AttachmentLinkListProps {
    itemCount: number;
    getItem: (index: number) => AttachmentLinkListItemProps;
    getItemKey?: (index: number) => Key;
}

function AttachmentLinkList({
    itemCount,
    getItem,
    getItemKey
}: AttachmentLinkListProps) {
    const renderItem = (index: number) => {
        const itemProps = getItem(index);
        const itemKey = getItemKey ? getItemKey(index) : index;
        return (
            <AttachmentLinkListItem
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

export default AttachmentLinkList;
