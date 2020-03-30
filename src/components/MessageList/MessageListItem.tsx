import React, {Key} from 'react';
import {CheckboxProps, ListItem, ListItemTextProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export interface MessageListItemProps {
    key?: Key;
    variant?: 'default' | 'checkbox';
    text: ListItemTextProps['secondary'];
    createdAt: Date;
    CheckboxProps?: CheckboxProps;
}

function MessageListItem({
    key,
    variant = 'default',
    text,
    createdAt,
    CheckboxProps
}: MessageListItemProps) {
    const primary = (
        <Typography
            variant="body2"
        >
            {text}
        </Typography>
    );

    const secondary = (
        <Typography
            variant="caption"
        >
            {createdAt.toLocaleTimeString().substring(0, 5)}
        </Typography>

    );

    const listItemIcon = variant === 'checkbox' && (
        <ListItemIcon>
            <Checkbox
                {...CheckboxProps}
            />
        </ListItemIcon>
    );

    return (
        <ListItem
            key={key}
            dense
            selected={CheckboxProps?.checked}
        >
            {listItemIcon}
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
        </ListItem>
    );
}

export default MessageListItem;
