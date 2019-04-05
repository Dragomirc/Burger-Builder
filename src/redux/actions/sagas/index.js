import { takeEvery } from "redux-saga/effects";
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";
import { AUTH } from "../../constants";

export function* watchAuth() {
    yield takeEvery(AUTH.INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(AUTH.CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(AUTH.INITIATE_AUTH, authUserSaga);
    yield takeEvery(AUTH.CHECK_STATE_INIT, authCheckStateSaga);
}
