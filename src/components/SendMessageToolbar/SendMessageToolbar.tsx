import React, {useState} from "react";
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Send} from "@material-ui/icons";
import MessageField from "./MessageField";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import EmojiList from "../EmojiList";
import Container from "@material-ui/core/Container";

export interface SendMessageToolbarProps {
    onSubmit?: (message: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageField: {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        flex: 'auto'
    },
    sendButton: {
        marginLeft: theme.spacing(1)
    },
    emojiList: {
        maxHeight: 140,
        overflow: 'auto'
    }
}));

function SendMessageToolbar({ onSubmit }: SendMessageToolbarProps) {
    const classes = useStyles();
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [message, setMessage] = useState<string>('');
    const handleEmojiOpen = () => setEmojiOpen(!emojiOpen);
    const handleSubmit = () => {
        onSubmit && onSubmit(message);
        setMessage('');
        setEmojiOpen(false);
    };

    const sendButton = (
        <Tooltip title="Send">
            <IconButton
                className={classes.sendButton}
                edge="end"
                disabled={!message}
                onClick={handleSubmit}
            >
                <Send />
            </IconButton>
        </Tooltip>
    );

    const messageField = (
        <div className={classes.messageField}>
            <MessageField
                value={message}
                onKeyUp={(event) => (
                    message &&
                    event.keyCode === 13 &&
                    event.ctrlKey &&
                    handleSubmit()
                )}
                onChange={event => setMessage(event.target.value)}
                onEmojiOpen={handleEmojiOpen}
                multiline
                rowsMax={3}
            />
        </div>
    );

    const emojiList = emojiOpen && (
        <Container className={classes.emojiList}>
            <EmojiList
                onClick={emoji => setMessage(message + emoji)}
            />
        </Container>
    );

    return (
        <div>
            {emojiList}
            <Toolbar>
                {messageField}
                {sendButton}
            </Toolbar>
        </div>
    )
}

export default SendMessageToolbar;
