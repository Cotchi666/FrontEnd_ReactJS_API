import actionTypes from './actionTypes';


export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    adminInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})