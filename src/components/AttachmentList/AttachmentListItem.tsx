import React, {Key, ReactElement} from 'react';
import {AvatarProps, createStyles, Theme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {
    Audiotrack,
    MoreVert,
    PlayCircleOutline,
    Image,
    TextFields,
    Message,
    FontDownload,
    Attachment
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

export interface AttachmentListItemProps {
    key?: Key;
    name: File['name'];
    size: File['size'];
    type: File['type'];
    lastModified: File['lastModified'];
    avatarSrc?: AvatarProps['src'];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    primary: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));

const typeIcons: {[key: string]: ReactElement} = {
    'video': <PlayCircleOutline/>,
    'audio': <Audiotrack/>,
    'image': <Image/>,
    'font': <FontDownload/>,
    'text': <TextFields/>,
    'message': <Message />
};

function AttachmentListItem(props: AttachmentListItemProps) {
    const classes = useStyles();

    return (
        <ListItem dense>
            <ListItemAvatar>
                <Avatar
                    //src={props.avatarSrc}
                    children={typeIcons[props.type] || <Attachment/>}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <span className={classes.primary}>
                        {props.name}
                    </span>
                }
                secondary={new Date(props.lastModified).toLocaleDateString()}
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                >
                    <MoreVert/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AttachmentListItem;
