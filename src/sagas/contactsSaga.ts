import {all, call, put, takeEvery, delay} from "redux-saga/effects";
import {addContact, fetchContacts, removeContact} from "../services/contactService";
import {ErrorResponse, FetchList} from "../interfaces/Service";
import {Contact} from "../models/Contact";
import {contactsFailure, contactsRequest, contactsSuccess, addOneContact, removeContactById} from "../store/contactsSlice";
import {setStatusError, setStatusMessage} from "../store/statusSlice";

function* removeContactSaga(action: ReturnType<typeof removeContactById>) {
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

function* addContactSaga(action: ReturnType<typeof addOneContact>) {
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

function* fetchContactsSaga() {
    yield delay(240);
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

function* watchContactsSaga() {
    yield all([
        takeEvery(removeContactById.type, removeContactSaga),
        takeEvery(addOneContact.type, addContactSaga),
        takeEvery(contactsRequest.type, fetchContactsSaga)
    ])
}

export default watchContactsSaga;