import {all, call, put, delay, fork, takeEvery} from "redux-saga/effects";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {setStatusError} from "../store/statusSlice";
import {addMessage, fetchMessages, removeMessages} from "../services/messageService";
import {
    addOneMessage,
    removeManyMessages,
    addMessageRequest,
    messagesFailure,
    messagesRequest,
    messagesSuccess,
    setMessagePrints
} from "../store/chatsSlice";
import {Message} from "../models/Message";
import {Chat} from "../models/Chat";
import {fakerService} from "../services/fakerService";

function* removeMessageSaga(action: ReturnType<typeof removeManyMessages>) {
    const { messageIds } = action.payload;
    try {
        const request = () => removeMessages(messageIds);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
    } catch (error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* sendFakeAnswerSaga(chatId: Chat['id']) {
    const message = fakerService.message();
    message.createdBy = chatId;
    message.createdByMe = false;
    message.createdAt = new Date();
    message.attachmentLink = undefined;
    message.attachmentFile = undefined;
    message.read = true;
    message.delivered = true;

    const startPrintsTimeout = (Math.random() * 2000 + 1000);
    yield delay(startPrintsTimeout);
    const startsPrintsAction = setMessagePrints({chatId, prints: true});
    yield put(startsPrintsAction);

    const timeout = message.text.length * (Math.random() * 10 + 5);
    yield delay(timeout);
    const addMessageAction = addOneMessage({chatId, message});
    const endsPrintsAction = setMessagePrints({chatId, prints: false});
    yield all([
        put(addMessageAction),
        put(endsPrintsAction)
    ]);
}

function* addMessageSaga(action: ReturnType<typeof addMessageRequest>) {
    const { chatId, messageText } = action.payload;
    try {
        const request = () => addMessage(chatId, messageText);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const message = response as Message;
        const action = addOneMessage({chatId, message});
        yield all([
            put(action),
            fork(sendFakeAnswerSaga, chatId),
        ]);
    } catch (error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* fetchMessagesSaga(action: ReturnType<typeof messagesRequest>) {
    yield delay(240); // need remove in production
    const { chatId } = action.payload;
    try {
        const request = () => fetchMessages();
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const messages = (response as FetchList<Message>).items;
        const action = messagesSuccess({chatId, messages});
        yield put(action);
    } catch (error) {
        const action = messagesFailure({chatId});
        const statusAction = setStatusError(error.message);
        yield all([
            put(action),
            put(statusAction)
        ])
    }
}

function* watchChatSaga() {
    yield all([
        takeEvery(removeManyMessages.type, removeMessageSaga),
        takeEvery(addMessageRequest.type, addMessageSaga),
        takeEvery(messagesRequest.type, fetchMessagesSaga)
    ])
}

export default watchChatSaga;