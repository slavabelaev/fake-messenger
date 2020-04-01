import React from "react";
import {createStyles, IconButtonProps, Theme, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Send} from "@material-ui/icons";
import MessageField, {MessageFieldProps} from "../fields/MessageField";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

export interface SendMessageToolbarProps {
    IconButtonProps?: IconButtonProps;
    MessageFieldProps?: MessageFieldProps;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageField: {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        flex: 'auto'
    },
    sendButton: {
        marginLeft: theme.spacing(1)
    }
}));

function SendMessageToolbar(props: SendMessageToolbarProps) {
    const classes = useStyles();

    const sendButton = (
        <Tooltip title="Send">
            <IconButton
                className={classes.sendButton}
                edge="end"
                {...props.IconButtonProps}
            >
                <Send />
            </IconButton>
        </Tooltip>
    );

    const messageField = (
        <div className={classes.messageField}>
            <MessageField
                {...props.MessageFieldProps}
                multiline
                rowsMax={3}
            />
        </div>
    );

    return (
        <Toolbar>
            {messageField}
            {sendButton}
        </Toolbar>
    )
}

export default SendMessageToolbar;
