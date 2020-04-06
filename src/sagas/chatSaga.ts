import {all, call, put, delay, takeEvery} from "redux-saga/effects";
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

function* removeMessageWorker(action: ReturnType<typeof removeManyMessages>) {
    const { messageIds } = action.payload;
    const request = () => removeMessages(messageIds);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    }
}

function* removeMessageWatch() {
    yield takeEvery(removeManyMessages.type, removeMessageWorker);
}

function* sendFakeAnswerWorker(chatId: Chat['id']) {
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

function* addMessageWorker(action: ReturnType<typeof addMessageRequest>) {
    const { chatId, messageText } = action.payload;
    const request = () => addMessage(chatId, messageText);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    } else {
        const message = response as Message;
        const action = addOneMessage({chatId, message});
        yield all([
            put(action),
            sendFakeAnswerWorker(chatId)
        ]);
    }
}

function* addMessageWatch() {
    yield takeEvery(addMessageRequest.type, addMessageWorker);
}

function* fetchMessagesWorker(action: ReturnType<typeof messagesRequest>) {
    const { chatId } = action.payload;
    const request = () => fetchMessages();
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const action = messagesFailure({chatId});
        const statusAction = setStatusError(errors[0]);
        yield all([
            put(action),
            put(statusAction)
        ])
    } else {
        const messages = (response as FetchList<Message>).items;
        const action = messagesSuccess({chatId, messages});
        yield put(action);
    }
}

function* fetchMessagesWatch() {
    yield takeEvery(messagesRequest.type, fetchMessagesWorker);
}

function* chatSaga() {
    yield all([
        fetchMessagesWatch(),
        addMessageWatch(),
        removeMessageWatch()
    ])
}

export default chatSaga;