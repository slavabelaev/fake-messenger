import React from "react";
import {AvatarProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

export interface ContactListItemProps {
    avatarSrc: AvatarProps['src'];
    fullName: ListItemTextProps['primary'];
    lastMessage: ListItemTextProps['secondary'];
    to?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageText: {
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

function ContactListItem(props: ContactListItemProps) {
    const classes = useStyles();
    return (
        <ListItem
            button
            component={NavLink}
            activeClassName="Mui-selected"
            to={props.to || '/'}
        >
            <ListItemAvatar>
                <Avatar
                    src={props.avatarSrc}
                />
            </ListItemAvatar>
            <ListItemText
                primary={props.fullName}
                secondary={
                    <span className={classes.messageText}>
                        {props.lastMessage}
                    </span>
                }
            />
            <ListItemSecondaryAction>
                <IconButton edge="end">
                    <MoreVert />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ContactListItem;
