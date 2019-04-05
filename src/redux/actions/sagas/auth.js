import { put, delay } from "redux-saga/effects";
import axios from "axios";
import {
    logoutSucceed,
    logout,
    authStart,
    authSuccess,
    checkAuthTimeout,
    authFail
} from "../auth";

export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    yield put(authStart());
    const signUpUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBc5__f46v706ObrBZO4ADWe-I7d9-xUl4";
    const signInUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBc5__f46v706ObrBZO4ADWe-I7d9-xUl4";
    const url = action.isSignUp ? signUpUrl : signInUrl;

    try {
        const res = yield axios.post(url, {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        });

        const expirationDate = yield new Date(
            new Date().getTime() + res.data.expiresIn * 1000
        );
        yield localStorage.setItem("token", res.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", res.data.localId);
        yield put(authSuccess(res.data));
        yield put(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
        yield put(authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem("userId");
            yield put(authSuccess({ idToken: token, localId: userId }));
            yield put(
                checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        } else {
            yield put(logout());
        }
    }
}
