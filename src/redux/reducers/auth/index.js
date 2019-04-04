import { AUTH } from "../../constants";

const initialState = {
    error: null,
    loading: false,
    userId: null,
    token: null,
    authRedirectPath: "/"
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.START:
            return {
                ...state,

                loading: true
            };
        case AUTH.SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                token: action.authData.idToken,
                userId: action.authData.localId
            };
        case AUTH.FAIL:
            return {
                ...state,
                loading: false,
                error: action.error.message
            };
        case AUTH.LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case AUTH.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            };
        default:
            return state;
    }
};

export default authReducer;
