import React, {Key} from "react";
import {AvatarProps, createStyles, Theme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {OpenInNew, Image} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

export interface AttachmentLinkListItemProps {
    key?: Key;
    primary: string;
    secondary: string;
    to: string;
    avatarSrc?: AvatarProps['src'];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    singleLine: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
}));

function AttachmentLinkListItem(props: AttachmentLinkListItemProps) {
    const classes = useStyles();

    return (
        <ListItem
            key={props.key}
            dense
            button
            component="a"
            target="_blank"
            href={props.to}
        >
            <ListItemAvatar>
                <Avatar
                    variant="rounded"
                    //src={props.avatarSrc}
                    children={<Image/>}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <span className={classes.singleLine}>
                        {props.primary}
                    </span>
                }
                secondary={
                    <span className={classes.singleLine}>
                        {props.secondary}
                    </span>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    component="a"
                    target="_blank"
                    href={props.to}
                >
                    <OpenInNew/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AttachmentLinkListItem;
