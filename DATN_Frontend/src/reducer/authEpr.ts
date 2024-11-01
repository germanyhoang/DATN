import actionTypes from "../app/actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    email: null
}

const authEmprReducer = (state = initState, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_EPR:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                email: action.email
            }
        case actionTypes.LOGOUT_EPR:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                email: null
            }

        default:
            return state;
    }
}

export default authEmprReducer
