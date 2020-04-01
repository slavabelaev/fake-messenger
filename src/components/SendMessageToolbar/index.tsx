import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {insertMessageAsync} from "../MessageList/chatsSlice";
import SendMessageToolbar from "./SendMessageToolbar";
import {Chat} from "../../models/Chat";

export interface SendMessageToolbarContainerProps {
    chatId: Chat['id'];
}

function SendMessageToolbarContainer({ chatId }: SendMessageToolbarContainerProps) {
    const [message, setMessage] = useState<string>('');
    const isEmptyMessage = !Boolean(message);
    const dispatch = useDispatch();

    const handleSubmitMessage = () => {
        insertMessageAsync(chatId, message)(dispatch);
        setMessage('');
    };

    return (
        <SendMessageToolbar
            IconButtonProps={{
                onClick: handleSubmitMessage,
                disabled: isEmptyMessage
            }}
            MessageFieldProps={{
                value: message,
                onKeyUp: event => {
                    return !isEmptyMessage &&
                    event.keyCode === 13 &&
                    event.ctrlKey &&
                    handleSubmitMessage()
                },
                onChange: event => setMessage(event.target.value)
            }}
        />
    );
}

export default SendMessageToolbarContainer;
