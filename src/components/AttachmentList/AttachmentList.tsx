import React from 'react';
import AttachmentListItem, {AttachmentListItemProps} from "./AttachmentListItem";
import List from "@material-ui/core/List";

export interface AttachmentListProps {
    itemCount: number;
    getItem: (index: number) => AttachmentListItemProps;
}

function AttachmentList(props: AttachmentListProps) {
    const renderItem = (_: null, index: number) => (
        <AttachmentListItem
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

export default AttachmentList;
