import React, {ReactNode} from "react";
import {AvatarProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import {InfoOutlined} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import MessageReadStatus, {MessageReadStatusProps} from "../MessageList/MessageReadStatus";

export interface ContactListItemProps {
    avatarSrc: AvatarProps['src'];
    fullName: ListItemTextProps['primary'];
    lastMessage?: {
        text: ListItemTextProps['secondary'];
        delivered: MessageReadStatusProps['delivered'];
        read: MessageReadStatusProps['read'];
        createdAt: Date;
    };
    isOnline: boolean;
    to?: string;
    toProfile?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageText: {
        display: 'block',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

function ContactListItem({
    avatarSrc,
    fullName,
    lastMessage,
    isOnline,
    to,
    toProfile
}: ContactListItemProps) {
    const classes = useStyles();

    const listItemSecondaryAction = toProfile ? (
        <ListItemSecondaryAction>
            <IconButton
                component={NavLink}
                to={toProfile}
            >
                <InfoOutlined/>
            </IconButton>
        </ListItemSecondaryAction>
    ) : null;

    const secondaryText = lastMessage ? (
        <span className={classes.messageText}>
            <MessageReadStatus
                delivered={lastMessage.delivered}
                read={lastMessage.read}
                gutterRight
            />
            {lastMessage.text}
        </span>
    ) : null;

    return (
        <ListItem
            button
            component={NavLink}
            activeClassName="Mui-selected"
            to={to || '/'}
        >
            <ListItemAvatar>
                <Badge
                    variant="dot"
                    overlap="circle"
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom'
                    }}
                    color="primary"
                    invisible={!isOnline}
                >
                    <Avatar
                        src={avatarSrc}
                    />
                </Badge>
            </ListItemAvatar>
            <ListItemText
                primary={fullName}
                secondary={secondaryText}
            />
            {listItemSecondaryAction}
        </ListItem>
    )
}

export default ContactListItem;
