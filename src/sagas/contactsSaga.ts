import {all, call, put, takeEvery, takeLatest, delay} from "redux-saga/effects";
import {addContact, fetchContacts, removeContact} from "../services/contactService";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {Contact} from "../models/Contact";
import {contactsFailure, contactsRequest, contactsSuccess, addOneContact, removeContactById} from "../store/contactsSlice";
import {setStatusError, setStatusMessage} from "../store/statusSlice";

function* removeContactSaga(action: ReturnType<typeof removeContactById>) {
    const id = action.payload as string;
    try {
        const request = () => removeContact(id);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw errors;
        const statusAction = setStatusMessage(`Success removed`);
        yield put(statusAction);
    } catch(errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    }
}

function* addContactSaga(action: ReturnType<typeof addOneContact>) {
    const contact = action.payload;
    try {
        const request = () => addContact(contact.id);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw errors;
        const statusMessage = `${contact.firstName} ${contact.lastName} added to contacts`;
        const statusAction = setStatusMessage(statusMessage);
        yield put(statusAction);
    } catch(errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    }
}

function* fetchContactsSaga() {
    // need remove in production
    yield delay(240);
    try {
        const response = yield call(fetchContacts);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw errors;
        const contacts = (response as FetchList<Contact>).items;
        const action = contactsSuccess(contacts);
        yield put(action);
    } catch(errors) {
        const action = contactsFailure();
        const statusAction = setStatusError(errors[0]);
        yield all([
            put(action),
            put(statusAction)
        ])
    }
}

function* watchContactsSaga() {
    yield all([
        takeEvery(removeContactById.type, removeContactSaga),
        takeEvery(addOneContact.type, addContactSaga),
        takeLatest(contactsRequest.type, fetchContactsSaga)
    ])
}

export default watchContactsSaga;