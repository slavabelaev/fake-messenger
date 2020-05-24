import {all, call, put, delay, fork, takeEvery} from "redux-saga/effects";
import {ErrorResponse, SuccessResponse} from "../../common/interfaces/Service";
import {setStatusError} from "../../app/statusSlice";
import {addMessage, fetchMessages, removeMessages} from "../messages/messageService";
import {
    addMessageSuccess,
    removeMessagesSuccess,
    addMessageRequest,
    fetchMessagesFailure,
    fetchMessagesRequest,
    fetchMessagesSuccess,
    setMessagePrints
} from "./chatsSlice";
import {Message} from "../messages/Message";
import {Chat} from "./Chat";
import {generateMessage} from "../messages/generateMessage";

function* removeMessageSaga(action: ReturnType<typeof removeMessagesSuccess>) {
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
    const message = generateMessage();
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
    const addMessageAction = addMessageSuccess({chatId, message});
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
        const action = addMessageSuccess({chatId, message});
        yield all([
            put(action),
            fork(sendFakeAnswerSaga, chatId),
        ]);
    } catch (error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* fetchMessagesSaga(action: ReturnType<typeof fetchMessagesRequest>) {
    yield delay(240); // need remove in production
    const { chatId } = action.payload;
    try {
        const request = () => fetchMessages();
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const messages = (response as SuccessResponse<Message>).items;
        const action = fetchMessagesSuccess({chatId, messages});
        yield put(action);
    } catch (error) {
        const action = fetchMessagesFailure({chatId});
        const statusAction = setStatusError(error.message);
        yield all([
            put(action),
            put(statusAction)
        ])
    }
}

function* watchChatSaga() {
    yield all([
        takeEvery(removeMessagesSuccess.type, removeMessageSaga),
        takeEvery(addMessageRequest.type, addMessageSaga),
        takeEvery(fetchMessagesRequest.type, fetchMessagesSaga)
    ])
}

export default watchChatSaga;