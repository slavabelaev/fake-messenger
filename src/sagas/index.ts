import {all} from "redux-saga/effects";
import contactsSaga from "./contactsSaga";

export default function* rooSaga() {
    yield all([
        contactsSaga()
    ]);
}
