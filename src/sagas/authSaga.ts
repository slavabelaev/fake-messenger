import {call, all, takeEvery, put} from "redux-saga/effects";
import {authRequest, authSuccess, authFailure, updateProfile} from "../store/authSlice";
import {signInWithLoginAndPassword, updateUserProfile} from "../services/authService";
import {ErrorResponse} from "../interfaces/Service";
import {setStatusError, setStatusMessage} from "../store/statusSlice";
import {AuthUser} from "../models/AuthUser";

function* signInSaga(action: ReturnType<typeof authRequest>) {
    const { login, password } = action.payload;
    const request = () => signInWithLoginAndPassword(login, password);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const action = authFailure();
        const statusAction = setStatusError(errors[0]);
        yield all([
            put(action),
            put(statusAction)
        ]);
    } else {
        const user = response as AuthUser;
        const action = authSuccess(user);
        const statusAction = setStatusMessage(`Authorized as ${user.firstName} ${user.lastName}`);
        yield all([
            put(action),
            put(statusAction)
        ]);
    }
}

function* updateProfileSaga(action: ReturnType<typeof updateProfile>) {
    const profileChanges = action.payload;
    const request = () => updateUserProfile(profileChanges);
    const response = yield call(request);
    const errors = (response as ErrorResponse).errors;
    if (errors) {
        const statusAction = setStatusError(errors[0]);
        yield put(statusAction);
    } else {
        const statusAction = setStatusMessage('Profile updated');
        yield put(statusAction);
    }
}

function* watchAuthSaga() {
    yield all([
        takeEvery(authRequest.type, signInSaga),
        takeEvery(updateProfile.type, updateProfileSaga)
    ])
}

export default watchAuthSaga;