import React, {Key} from 'react';
import AttachmentListItem, {AttachmentListItemProps} from "./AttachmentListItem";
import ListView from "../ListView";

export interface AttachmentListProps {
    itemCount: number;
    getItem: (index: number) => AttachmentListItemProps;
    getItemKey?: (index: number) => Key;
}

function AttachmentList({
    itemCount,
    getItem,
    getItemKey
}: AttachmentListProps) {
    const renderItem = (index: number) => {
        const itemProps = getItem(index);
        const itemKey = getItemKey ? getItemKey(index) : index;
        return (
            <AttachmentListItem
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

export default AttachmentList;
