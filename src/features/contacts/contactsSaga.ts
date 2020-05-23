import {all, call, put, takeEvery, takeLatest, delay} from "redux-saga/effects";
import {addContact, fetchContacts, removeContact} from "./contactService";
import {ErrorResponse, FetchList} from "../../common/interfaces/Service";
import {Contact} from "./Contact";
import {contactsFailure, contactsRequest, contactsSuccess, addOneContact, removeContactById} from "./contactsSlice";
import {setStatusError, setStatusMessage} from "../../app/statusSlice";

function* removeContactSaga(action: ReturnType<typeof removeContactById>) {
    const id = action.payload as string;
    try {
        const request = () => removeContact(id);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const statusAction = setStatusMessage(`Success removed`);
        yield put(statusAction);
    } catch(error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* addContactSaga(action: ReturnType<typeof addOneContact>) {
    const contact = action.payload;
    try {
        const request = () => addContact(contact.id);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const statusMessage = `${contact.firstName} ${contact.lastName} added to contacts`;
        const statusAction = setStatusMessage(statusMessage);
        yield put(statusAction);
    } catch(error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* fetchContactsSaga() {
    yield delay(240); // need remove in production
    try {
        const response = yield call(fetchContacts);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const contacts = (response as FetchList<Contact>).items;
        const action = contactsSuccess(contacts);
        yield put(action);
    } catch(error) {
        const action = contactsFailure();
        const statusAction = setStatusError(error.message);
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