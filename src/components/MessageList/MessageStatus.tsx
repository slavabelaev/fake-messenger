import React from 'react';
import {Check} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

export interface MessageStatusProps {
    delivered?: boolean;
    read?: boolean;
    gutterRight?: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    gutterRight: {
        marginRight: theme.spacing(.25)
    },
    deliveredIcon: {
        zIndex: 1
    },
    readIcon: {
        marginLeft: -theme.spacing(1)
    },
}));

function MessageStatus(props: MessageStatusProps) {
    const classes = useStyles();
    const className = [
        classes.root,
        props.gutterRight ? classes.gutterRight : ''
    ].join(' ');
    return (
        <span className={className}>
            <Check
                className={classes.deliveredIcon}
                color={props.delivered ? 'primary' : 'disabled'}
                fontSize="inherit"
            />
            <Check
                className={classes.readIcon}
                color={props.read ? 'primary' : 'disabled'}
                fontSize="inherit"
            />
        </span>
    );
}

export default MessageStatus;
