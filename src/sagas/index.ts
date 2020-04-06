import {all} from "redux-saga/effects";
import contactsSaga from "./contactsSaga";
import authSaga from "./authSaga";

export default function* rooSaga() {
    yield all([
        contactsSaga(),
        authSaga()
    ]);
}
