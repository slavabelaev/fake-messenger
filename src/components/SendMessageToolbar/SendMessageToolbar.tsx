import React, {useState} from "react";
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AttachFile, InsertEmoticon, Send} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import EmojiList from "./EmojiList";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

export interface SendMessageToolbarProps {
    onSubmit?: (message: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {},
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
                color="primary"
                disabled={!message}
                onClick={handleSubmit}
            >
                <Send />
            </IconButton>
        </Tooltip>
    );

    const startAdornment = (
        <InputAdornment position="start">
            <Tooltip title="Insert emoticon">
                <IconButton
                    edge="start"
                    size="small"
                    color={emojiOpen ? 'primary' : 'default'}
                    onClick={handleEmojiOpen}
                >
                    <InsertEmoticon />
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );

    const endAdornment = (
        <InputAdornment position="end">
            <Tooltip title="Attach file">
                <IconButton
                    edge="end"
                    size="small"
                    component="label"
                    htmlFor="attach-file"
                >
                    <AttachFile />
                </IconButton>
            </Tooltip>
            <input
                id="attach-file"
                type="file"
                hidden
            />
        </InputAdornment>
    );

    const messageField = (
        <div className={classes.messageField}>
            <TextField
                value={message}
                onKeyUp={(event) => (
                    message &&
                    event.keyCode === 13 &&
                    event.ctrlKey &&
                    handleSubmit()
                )}
                onChange={event => setMessage(event.target.value)}
                multiline
                rowsMax={3}
                variant="outlined"
                size="small"
                placeholder="Enter message"
                InputProps={{
                    startAdornment,
                    endAdornment
                }}
                fullWidth
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
        <div className={classes.root}>
            {emojiList}
            <Toolbar>
                {messageField}
                {sendButton}
            </Toolbar>
        </div>
    )
}

export default SendMessageToolbar;
