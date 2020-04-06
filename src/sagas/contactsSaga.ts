import {all, call, put, takeEvery} from "redux-saga/effects";
import {addContact, fetchContacts, removeContact} from "../services/contactService";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {Contact} from "../models/Contact";
import {contactsFailure, contactsRequest, contactsSuccess, addOneContact, removeContactById} from "../store/contactsSlice";
import {setStatusError, setStatusMessage} from "../store/statusSlice";

function* removeContactWorker(action: ReturnType<typeof removeContactById>) {
    const id = action.payload as string;
    const request = () => removeContact(id);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    } else {
        const statusAction = setStatusMessage(`Success removed`);
        yield put(statusAction);
    }
}

function* removeContactWatch() {
    yield takeEvery(removeContactById.type, removeContactWorker);
}

function* addContactWorker(action: ReturnType<typeof addOneContact>) {
    const contact = action.payload;
    const request = () => addContact(contact.id);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    } else {
        const statusMessage = `${contact.firstName} ${contact.lastName} added to contacts`;
        const statusAction = setStatusMessage(statusMessage);
        yield put(statusAction);
    }
}

function* addContactWatch() {
    yield takeEvery(addOneContact.type, addContactWorker);
}

function* fetchContactsWorker() {
    const response = yield call(fetchContacts);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const action = contactsFailure();
        const statusAction = setStatusError(errors[0]);
        yield all([
            put(action),
            put(statusAction)
        ])
    } else {
        const contacts = (response as FetchList<Contact>).items;
        const action = contactsSuccess(contacts);
        yield put(action);
    }
}

function* fetchContactsWatch() {
    yield takeEvery(contactsRequest.type, fetchContactsWorker);
}

function* contactsSaga() {
    yield all([
        fetchContactsWatch(),
        addContactWatch(),
        removeContactWatch()
    ])
}

export default contactsSaga;