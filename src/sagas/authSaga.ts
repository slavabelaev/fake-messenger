import {call, all, takeEvery, put, takeLatest} from "redux-saga/effects";
import {authRequest, authSuccess, authFailure, updateProfile} from "../store/authSlice";
import {signInWithLoginAndPassword, updateUserProfile} from "../services/authService";
import {ErrorResponse} from "../interfaces/Service";
import {setStatusError, setStatusMessage} from "../store/statusSlice";
import {AuthUser} from "../models/AuthUser";

function* signInSaga(action: ReturnType<typeof authRequest>) {
    const { login, password } = action.payload;
    try {
        const request = () => signInWithLoginAndPassword(login, password);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const user = response as AuthUser;
        const action = authSuccess(user);
        const statusAction = setStatusMessage(`Authorized as ${user.firstName} ${user.lastName}`);
        yield all([
            put(action),
            put(statusAction)
        ]);
    } catch(error) {
        const action = authFailure();
        const statusAction = setStatusError(error.message);
        yield all([
            put(action),
            put(statusAction)
        ]);
    }
}

function* updateProfileSaga(action: ReturnType<typeof updateProfile>) {
    const profileChanges = action.payload;
    try {
        const request = () => updateUserProfile(profileChanges);
        const response = yield call(request);
        const errors = (response as ErrorResponse).errors;
        if (errors) throw new Error(errors[0]);
        const statusAction = setStatusMessage('Profile updated');
        yield put(statusAction);
    } catch(error) {
        const statusAction = setStatusError(error.message);
        yield put(statusAction);
    }
}

function* watchAuthSaga() {
    yield all([
        takeLatest(authRequest.type, signInSaga),
        takeEvery(updateProfile.type, updateProfileSaga)
    ])
}

export default watchAuthSaga;