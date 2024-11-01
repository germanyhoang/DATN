import actionTypes from "../app/actions/actionTypes";

const initState = {
    isLoggedIn: false
}

const authAdmReducer = (state = initState, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_ADM:
            return {
                ...state,
                isLoggedIn: true
            }
        case actionTypes.LOGOUT_ADM:
            return {
                ...state,
                isLoggedIn: false
            }

        default:
            return state;
    }
}

export default authAdmReducer
