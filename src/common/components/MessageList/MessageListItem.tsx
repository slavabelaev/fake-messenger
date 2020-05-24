import React from 'react';
import {CheckboxProps, createStyles, ListItem, ListItemTextProps, Theme} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {makeStyles} from "@material-ui/core/styles";
import MessageReadStatus, {MessageReadStatusProps} from "./MessageReadStatus";
import AttachmentListItem from "../AttachmentList/AttachmentListItem";

export interface MessageListItemProps {
    variant?: 'default' | 'checkbox';
    direction?: 'right' | 'left';
    color?: 'primary' | 'default';
    text: ListItemTextProps['secondary'];
    delivered?: MessageReadStatusProps['delivered'];
    read?: MessageReadStatusProps['read'];
    createdAt: Date;
    CheckboxProps?: CheckboxProps;
}

const useStyles = (props: MessageListItemProps) => makeStyles((theme: Theme) => {
    const bgColor = props.color === 'primary'
        ? theme.palette.primary.main
        : theme.palette.background.paper;
    const textColor = props.color === 'primary'
        ? theme.palette.getContrastText(bgColor)
        : 'inherit';
    return createStyles({
        directionRight: {
            justifyContent: 'flex-end'
        },
        directionLeft: {
            justifyContent: 'flex-start'
        },
        message: {
            position: 'relative',
            maxWidth: '90%',
            marginLeft: props.direction === 'left'
                ? theme.spacing(2)
                : 'inherit',
            marginRight: props.direction === 'right'
                ? theme.spacing(2)
                : 'inherit',
            backgroundColor: bgColor,
            color: textColor,
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius
        },
        status: {
            display: 'inline-flex',
            alignItems: 'center',
            color: textColor
        },
        listItemText: {
            margin: 0
        },
        tailRight: {
            position: 'absolute',
            right: -theme.spacing(2) + theme.shape.borderRadius,
            top: 0,
            display: 'block',
            borderWidth: theme.spacing(1),
            borderColor: bgColor,
            borderStyle: 'solid',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent'
        },
        tailLeft: {
            position: 'absolute',
            left: -theme.spacing(2) + theme.shape.borderRadius,
            top: 0,
            display: 'block',
            borderWidth: theme.spacing(1),
            borderColor: bgColor,
            borderStyle: 'solid',
            borderLeftColor: 'transparent',
            borderBottomColor: 'transparent'
        },
        listItemIcon: {
            marginRight: 'auto'
        }
    })
});

function MessageListItem(props: MessageListItemProps) {
    const {
        variant = 'default',
        direction = 'right',
        text,
        delivered,
        read,
        createdAt,
        CheckboxProps
    } = props;
    const classes = useStyles(props)();

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
            color="inherit"
        >
            {createdAt.toLocaleTimeString().substring(0, 5)}
        </Typography>

    );

    const listItemIcon = variant === 'checkbox' && (
        <ListItemIcon
            className={classes.listItemIcon}
        >
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

    const messageTail = direction === 'right'
        ? <div className={classes.tailRight} />
        : <div className={classes.tailLeft} />;

    const className = direction === 'right'
        ? classes.directionRight
        : classes.directionLeft;
    return (
        <ListItem
            className={className}
            dense
            selected={CheckboxProps?.checked}
        >
            {listItemIcon}
            <div className={classes.message}>
                <ListItemText
                    className={classes.listItemText}
                    primary={primary}
                    secondary={
                        <span className={classes.status}>
                            {messageStatus}
                            {secondary}
                        </span>
                    }
                />
                {messageTail}
            </div>
        </ListItem>
    );
}

export default MessageListItem;
