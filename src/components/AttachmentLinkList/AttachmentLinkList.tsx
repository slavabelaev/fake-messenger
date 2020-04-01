import React from 'react';
import AttachmentLinkListItem, {AttachmentLinkListItemProps} from "./AttachmentLinkListItem";
import List from "@material-ui/core/List";

export interface AttachmentLinkListProps {
    itemCount: number;
    getItem: (index: number) => AttachmentLinkListItemProps;
}

function AttachmentLinkList(props: AttachmentLinkListProps) {
    const renderItem = (_: null, index: number) => (
        <AttachmentLinkListItem
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

export default AttachmentLinkList;
