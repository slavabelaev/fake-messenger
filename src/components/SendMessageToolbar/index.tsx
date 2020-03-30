import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {insertMessageAsync} from "../MessageList/messagesSlice";
import SendMessageToolbar from "./SendMessageToolbar";

function SendMessageToolbarContainer() {
    const { id: contactId } = useParams();
    const [message, setMessage] = useState<string>('');
    const dispatch = useDispatch();

    const handleSubmitMessage = () => {
        if (!contactId) return;
        insertMessageAsync(contactId, message)(dispatch);
        setMessage('');
    };

    return (
        <SendMessageToolbar
            onSubmit={handleSubmitMessage}
            MessageFieldProps={{
                value: message,
                onKeyUp: event => event.keyCode === 13 && event.ctrlKey && handleSubmitMessage(),
                onChange: event => setMessage(event.target.value)
            }}
        />
    );
}

export default SendMessageToolbarContainer;
