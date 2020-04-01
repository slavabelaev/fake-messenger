import React, {Key} from "react";
import {AvatarProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import Badge from "@material-ui/core/Badge";

export interface ContactListItemProps {
    key?: Key;
    avatarSrc: AvatarProps['src'];
    fullName: ListItemTextProps['primary'];
    lastMessage: ListItemTextProps['secondary'];
    isOnline: boolean;
    isFavorite?: boolean;
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
