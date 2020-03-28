import React from 'react';
import {ListItem, ListItemTextProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

export interface MessageListItemProps {
    text: ListItemTextProps['secondary'];
}

function MessageListItem(props: MessageListItemProps) {
    const primary = (
        <Typography
            variant="body2"
            component="span"
        >
            {props.text}
        </Typography>
    );

    const secondary = (
        <Typography
            variant="caption"
            component="span"
        >
            14:25
        </Typography>

    );

    return (
        <ListItem dense>
            <ListItemAvatar>
                <Checkbox/>
            </ListItemAvatar>
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
        </ListItem>
    );
}

export default MessageListItem;
