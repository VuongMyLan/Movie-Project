import { USER_LOGIN, ACCESSTOKEN } from '../../util/setting';
import { BOOKING_HISTORY } from '../actions/types/FilmType';
let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

console.log('usLogin', usLogin);
let usRegister = {};

const stateDefault = {
    userLogin: usLogin,
    userRegister: usRegister,
    userHistory: [],
    isLoading: false,
    arrUser: [],
};

export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOG_IN':
            state.userLogin = action.userLogin;
            // console.log('userLogin', state.userLogin, action);
            // console.log('userLogin', action, action.userLogin, state);
            return { ...state };

        case 'LOG_OUT':
            // state.userLogin = action.userLogin;
            // console.log('userLogout', state.userLogin);
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESSTOKEN);
            return { ...state, userLogin: {} };

        case 'REGISTER':
            return { ...state };

        case BOOKING_HISTORY:
            state.userHistory = action.userHistory;
            return { ...state };

        case 'SET_LIST_USER':
            state.arrUser = action.listUser;
            return { ...state };

        default:
            return state;
    }
};
