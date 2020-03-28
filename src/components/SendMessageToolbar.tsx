import React from "react";
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Send} from "@material-ui/icons";
import MessageField from "./fields/MessageField";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

export interface SendMessageToolbarProps {}

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
            >
                <Send />
            </IconButton>
        </Tooltip>
    );

    const messageField = (
        <MessageField/>
    );

    return (
        <Toolbar>
            {messageField}
            {sendButton}
        </Toolbar>
    )
}

export default SendMessageToolbar;
