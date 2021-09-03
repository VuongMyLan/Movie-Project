import { ACCESSTOKEN, USER_LOGIN } from '../../util/setting';
import { userService } from '../services/UserService';
import { history } from '../../App';
import { useSelector } from 'react-redux';
import { BOOKING_HISTORY } from './types/FilmType';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { quanLyNguoiDungService } from '../services/QuanLyNguoiDungService';
import { SET_LIST_USER } from './types/FilmType';
import { Alert } from 'antd';

export const userLoginAction = (userInfo) => {
    return async (dispatch) => {
        try {
            let result = await userService.LoginAction(userInfo);
            const action = {
                type: 'LOG_IN',
                userLogin: result.data,
                isLogin: true,
            };
            dispatch(action);
            console.log('result', result.data);
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
            if (result.data.maLoaiNguoiDung === 'KhachHang') {
                history.push('/');
            } else {
                history.push('/admin/film');
            }
            //history.goBack();
        } catch (error) {
            console.log('error', error.response?.data);
            alert(error.response?.data);
        }
    };
};

export const userRegisterAction = (regInfo) => {
    return async (dispatch) => {
        try {
            let result = await userService.RegisterAction(regInfo);
            const action = {
                type: 'REGISTER',
                userRegister: result.data,
            };
            alert('Đăng ký thành công');
            history.push('/');
            dispatch(action);
        } catch (error) {
            console.log('error', error.response?.data);
            alert(error.response?.data);
        }
    };
};

// get list data user
export const getListUSer =
    (taiKhoan = '') =>
    async (dispatch) => {
        try {
            const response = await quanLyNguoiDungService.getListUser(taiKhoan);
            const action = {
                type: 'SET_LIST_USER',
                listUser: response.data,
            };
            dispatch(action);
        } catch (err) {
            console.log('error', err.response?.data);
        }
    };
// add user action
export const addUser = (formData) => async (dispatch) => {
    try {
        console.log(formData);

        const response = await quanLyNguoiDungService.AddUser(formData);
        alert('add user success!');
        console.log(response.data);
    } catch (err) {
        alert(err.response?.data);
        console.log('error', err.response?.data);
    }
};
// edit user action
export const editUser = (formData) => async (dispatch) => {
    try {
        console.log('vlues', formData);
        await dispatch(displayLoadingAction);
        const response = await quanLyNguoiDungService.UpdateUser(formData);
        alert('edit user success!');

        // history.push('/admin/userinfo');
        console.log(response.data);
        await dispatch(hideLoadingAction);
    } catch (err) {
        alert(err.response?.data);
        console.log('error', err.response?.data);
        await dispatch(hideLoadingAction);
    }
};

//delete user
export const deleteUser = (taiKhoan) => async (dispatch) => {
    try {
        const response = await quanLyNguoiDungService.DeleteUser(taiKhoan);
        alert('delete user success!');
        dispatch(getListUSer());
    } catch (err) {
        console.log('error', err.response?.data);
    }
};

export const userHistoryAction = (userinfo) => {
    return async (dispatch) => {
        try {
            await dispatch(displayLoadingAction);
            let result = await userService.userHistory(userinfo);
            const action = {
                type: BOOKING_HISTORY,
                userHistory: result.data,
            };
            dispatch(action);
            await dispatch(hideLoadingAction);

            console.log('thongtinnguoidung', result.data);
        } catch (error) {
            console.log('error', error.response?.data);
        }
    };
};
