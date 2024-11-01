import actionTypes from "./actionTypes";

export const loginAuthEpr: any = (currentUser: any) => {
    if (currentUser) {
        return {
            type: actionTypes.LOGIN_EPR,
            token: currentUser.accessToken,
            email: currentUser.user.email
        }
    }
}

export const logoutAuthEpr: any = () => ({
    type: actionTypes.LOGOUT_EPR
})