import actionTypes from "../app/actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    email: null
}

const authReducer = (state = initState, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                email: action.email
            }
        case actionTypes.LOGOUT:
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

export default authReducer
