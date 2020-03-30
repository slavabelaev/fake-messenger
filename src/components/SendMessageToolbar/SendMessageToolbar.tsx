import React from "react";
import {createStyles, IconButtonProps, Theme, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Send} from "@material-ui/icons";
import MessageField, {MessageFieldProps} from "../fields/MessageField";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

export interface SendMessageToolbarProps {
    onSubmit?: IconButtonProps['onClick'];
    MessageFieldProps?: MessageFieldProps;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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
                onClick={props.onSubmit}
            >
                <Send />
            </IconButton>
        </Tooltip>
    );

    const messageField = (
        <MessageField
            {...props.MessageFieldProps}
        />
    );

    return (
        <Toolbar>
            {messageField}
            {sendButton}
        </Toolbar>
    )
}

export default SendMessageToolbar;
