import {all} from "redux-saga/effects";
import contactsSaga from "../features/contacts/contactsSaga";
import authSaga from "../features/auth/authSaga";
import chatSaga from "../features/chat/chatSaga";

export default function* rooSaga() {
    yield all([
        contactsSaga(),
        authSaga(),
        chatSaga()
    ]);
}
