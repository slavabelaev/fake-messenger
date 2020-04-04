import React, {Key} from "react";
import {AvatarProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import MessageReadStatus, {MessageReadStatusProps} from "../MessageList/MessageReadStatus";
import PopoverAction from "../PopoverAction";
import List from "@material-ui/core/List";
import MenuListItem from "../MenuListItem";
import {Label, TurnedIn} from "@material-ui/icons";

export interface ContactListItemProps {
    key?: Key;
    avatarSrc: AvatarProps['src'];
    fullName: ListItemTextProps['primary'];
    lastMessage?: {
        text: ListItemTextProps['secondary'];
        delivered: MessageReadStatusProps['delivered'];
        read: MessageReadStatusProps['read'];
    };
    isOnline: boolean;
    inBlackList?: boolean;
    to?: string;
    onDelete?: VoidFunction;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageText: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

function ContactListItem(props: ContactListItemProps) {
    const classes = useStyles();

    const secondaryAction = (
        <ListItemSecondaryAction>
            <PopoverAction
                renderPopover={(onClose) => (
                    <List>
                        <MenuListItem
                            primary="Delete"
                            onClick={() => {
                                props.onDelete && props.onDelete();
                                onClose();
                            }}
                        />
                    </List>
                )}
            />
        </ListItemSecondaryAction>
    );

    return (
        <ListItem
            key={props.key}
            button
            component={NavLink}
            activeClassName="Mui-selected"
            to={props.to || '/'}
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
                    invisible={!props.isOnline}
                >
                    <Avatar
                        src={props.avatarSrc}
                    />
                </Badge>
            </ListItemAvatar>
            <ListItemText
                primary={props.fullName}
                secondary={props.lastMessage &&
                    <span className={classes.messageText}>
                        <MessageReadStatus
                            delivered={props.lastMessage.delivered}
                            read={props.lastMessage.read}
                            gutterRight
                        />
                        {props.lastMessage.text}
                    </span>
                }
            />
            {secondaryAction}
        </ListItem>
    )
}

export default ContactListItem;
