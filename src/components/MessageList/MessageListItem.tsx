import React, {Key} from 'react';
import {CheckboxProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {makeStyles} from "@material-ui/core/styles";
import MessageReadStatus, {MessageReadStatusProps} from "./MessageReadStatus";

export interface MessageListItemProps {
    key?: Key;
    variant?: 'default' | 'checkbox';
    text: ListItemTextProps['secondary'];
    delivered?: MessageReadStatusProps['delivered'];
    read?: MessageReadStatusProps['read'];
    createdAt: Date;
    CheckboxProps?: CheckboxProps;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    status: {
        display: 'inline-flex',
        alignItems: 'center'
    }
}));

function MessageListItem({
    key,
    variant = 'default',
    text,
    delivered,
    read,
    createdAt,
    CheckboxProps
}: MessageListItemProps) {
    const classes = useStyles();

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

    const messageStatus = (
        <MessageReadStatus
            delivered={delivered}
            read={read}
            gutterRight
        />
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
                secondary={
                    <span className={classes.status}>
                        {messageStatus}
                        {secondary}
                    </span>
                }
            />
        </ListItem>
    );
}

export default MessageListItem;
