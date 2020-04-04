import React from 'react';
import {Check} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

export interface MessageReadStatusProps {
    delivered?: boolean;
    read?: boolean;
    gutterRight?: boolean;
}

const useStyles = (props: MessageReadStatusProps) => makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: props.gutterRight
            ? theme.spacing(.25)
            : 0
    },
    deliveredIcon: {
        zIndex: 1,
        opacity: props.delivered ? 1 : .25
    },
    readIcon: {
        marginLeft: -theme.spacing(1),
        opacity: props.read ? 1 : .25
    },
}));

function MessageReadStatus(props: MessageReadStatusProps) {
    const classes = useStyles(props)();
    return (
        <span className={classes.root}>
            <Check
                className={classes.deliveredIcon}
                color="inherit"
                fontSize="inherit"
            />
            <Check
                className={classes.readIcon}
                color="inherit"
                fontSize="inherit"
            />
        </span>
    );
}

export default MessageReadStatus;
