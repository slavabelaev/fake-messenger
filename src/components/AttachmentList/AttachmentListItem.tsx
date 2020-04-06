import React, {ReactElement} from "react";
import bytes from "bytes";
import {AvatarProps, createStyles, Theme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {
    Audiotrack,
    PlayCircleOutline,
    Image,
    TextFields,
    Message,
    FontDownload,
    Attachment
} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import PopoverAction from "../PopoverAction";
import List from "@material-ui/core/List";
import MenuListItem from "../MenuListItem";

export interface AttachmentListItemProps {
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
                    variant="rounded"
                    children={typeIcons[props.type] || <Attachment/>}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <span className={classes.primary}>
                        {props.name}
                    </span>
                }
                secondary={bytes(props.size)}
            />
            <ListItemSecondaryAction>
                <PopoverAction
                    renderPopover={onClose => (
                        <List>
                            <MenuListItem
                                primary="Download"
                            />
                            <MenuListItem
                                primary="Delete"
                            />
                        </List>
                    )}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AttachmentListItem;
