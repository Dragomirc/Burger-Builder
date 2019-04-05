import { AUTH } from "../../constants";

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
    return {
        type: AUTH.INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: AUTH.LOGOUT
    };
};
export const checkAuthTimeout = expirationTime => {
    return {
        type: AUTH.CHECK_TIMEOUT,
        expirationTime
    };
};

export const auth = (email, password, isSignUp) => {
    return {
        type: AUTH.INITIATE_AUTH,
        email,
        password,
        isSignUp
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: AUTH.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return {
        type: AUTH.CHECK_STATE_INIT
    };
};
