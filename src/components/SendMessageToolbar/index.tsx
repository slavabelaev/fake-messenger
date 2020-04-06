import React from 'react';
import {useDispatch} from "react-redux";
import {addMessageRequest} from "../../store/chatsSlice";
import SendMessageToolbar from "./SendMessageToolbar";
import {Chat} from "../../models/Chat";

export interface SendMessageToolbarContainerProps {
    chatId: Chat['id'];
}

function SendMessageToolbarContainer({ chatId }: SendMessageToolbarContainerProps) {
    const dispatch = useDispatch();

    return (
        <SendMessageToolbar
            onSubmit={messageText => {
                const action = addMessageRequest({chatId, messageText});
                dispatch(action);
            }}
        />
    );
}

export default SendMessageToolbarContainer;
