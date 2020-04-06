import {call, all, takeEvery, put} from "redux-saga/effects";
import {authRequest, authSuccess, authFailure, updateProfile} from "../store/authSlice";
import {signInWithLoginAndPassword, updateUserProfile} from "../services/authService";
import {ErrorResponse} from "../interfaces/Service";
import {setStatusError, setStatusMessage} from "../store/statusSlice";
import {AuthUser} from "../models/AuthUser";

function* signInWorker(action: ReturnType<typeof authRequest>) {
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

function* signInWatch() {
    yield takeEvery(authRequest.type, signInWorker);
}

function* updateProfileWorker(action: ReturnType<typeof updateProfile>) {
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

function* updateProfileWatch() {
    yield takeEvery(updateProfile.type, updateProfileWorker);
}

function* authSaga() {
    yield all([
        updateProfileWatch(),
        signInWatch()
    ])
}

export default authSaga;