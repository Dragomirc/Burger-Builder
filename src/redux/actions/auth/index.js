import { AUTH } from "../../constants";
import axios from "axios";

const signUpUrl =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBc5__f46v706ObrBZO4ADWe-I7d9-xUl4";
const signInUrl =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBc5__f46v706ObrBZO4ADWe-I7d9-xUl4";

export const authStart = () => {
    return { type: AUTH.START };
};

export const authSuccess = authData => {
    return {
        type: AUTH.SUCCESS,
        authData
    };
};

export const authFail = error => {
    return { type: AUTH.FAIL, error };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: AUTH.LOGOUT
    };
};
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => dispatch => {
    dispatch(authStart());
    const url = isSignUp ? signUpUrl : signInUrl;
    return axios
        .post(url, { email, password, returnSecureToken: true })
        .then(res => {
            const expirationDate = new Date(
                new Date().getTime() + res.data.expiresIn * 1000
            );
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res.data.localId);
            dispatch(authSuccess(res.data));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
};

export const setAuthRedirectPath = path => {
    return {
        type: AUTH.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate > new Date()) {
            const userId = localStorage.getItem("userId");
            dispatch(authSuccess({ idToken: token, localId: userId }));
            dispatch(
                checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        } else {
            dispatch(logout());
        }
    }
};
