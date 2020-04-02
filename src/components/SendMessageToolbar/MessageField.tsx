import React from 'react';
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton, {IconButtonProps} from "@material-ui/core/IconButton";
import {AttachFile, InsertEmoticon} from "@material-ui/icons";
import {Tooltip} from "@material-ui/core";

export type MessageFieldProps = TextFieldProps & {
    onEmojiOpen?: IconButtonProps['onClick'];
};

function MessageField(props: MessageFieldProps) {
    const startAdornment = (
        <InputAdornment position="start">
            <Tooltip title="Insert emoticon">
                <IconButton
                    edge="start"
                    size="small"
                    onClick={props.onEmojiOpen}
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

    return (
        <TextField
            {...props}
            variant="outlined"
            size="small"
            placeholder="Enter message"
            InputProps={{
                startAdornment,
                endAdornment
            }}
            fullWidth
        />
    );
}

export default MessageField;
