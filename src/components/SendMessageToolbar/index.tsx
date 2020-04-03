import React from 'react';
import {useDispatch} from "react-redux";
import {addMessageAsync} from "../MessageList/chatsSlice";
import SendMessageToolbar from "./SendMessageToolbar";
import {Chat} from "../../models/Chat";

export interface SendMessageToolbarContainerProps {
    chatId: Chat['id'];
}

function SendMessageToolbarContainer({ chatId }: SendMessageToolbarContainerProps) {
    const dispatch = useDispatch();

    return (
        <SendMessageToolbar
            onSubmit={message => addMessageAsync(chatId, message)(dispatch)}
        />
    );
}

export default SendMessageToolbarContainer;
