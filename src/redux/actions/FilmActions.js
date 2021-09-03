import { quanLyPhimService } from '../services/quanLyPhimService';
import { quanLyGheService } from '../services/QuanLyGheService';
import {
    SET_FILMS,
    SET_CHI_TIET_PHONG_VE,
    SET_FILM_DETAIL,
    GET_SCHEDULE,
    DISPLAY_LOADING,
    HIDE_LOADING,
} from '../actions/types/FilmType';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { history } from '../../App';

export const getApiFilmAction =
    (tenPhim = '') =>
    async (dispatch) => {
        try {
            let result = await quanLyPhimService.getFilmList(tenPhim);
            const action = {
                type: SET_FILMS,
                dataFilms: result.data,
            };
            dispatch(action);
        } catch (error) {
            console.log('error', error.response.data);
        }
    };

export const bookingroomAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            let result = await quanLyGheService.getBookingInfo(maLichChieu);
            const action = {
                type: SET_CHI_TIET_PHONG_VE,
                bookingDetail: result.data,
            };
            dispatch(action);
        } catch (error) {
            console.log('error', error?.response.data);
        }
    };
};

export const getApiFilmDetail = (maPhim) => async (dispatch) => {
    try {
        const response = await quanLyPhimService.getFilmDetail(maPhim);
        console.log(response.data);
        const action = {
            type: SET_FILM_DETAIL,
            filmDetail: response.data,
        };
        dispatch(action);
    } catch (error) {
        console.log('error', error?.response?.data);
    }
};

export const getTimescheduleAction = (maPhim) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction);
        try {
            let result = await quanLyPhimService.getTimeschedule(maPhim);
            const action = {
                type: GET_SCHEDULE,
                filmSchedule: result.data,
            };
            dispatch(action);
            dispatch(hideLoadingAction);
        } catch (error) {
            console.log('error', error.response?.data);
        }
    };
};

export const AddFilmAction = (formData) => async () => {
    try {
        const result = await quanLyPhimService.addFilmUploadHinh(formData);
        console.log(result);
        //const response = await quanLyPhimService.addFilm(formData);
        //console.log(response);
        alert('Add Films successfully');
        history.push('/admin/film');
    } catch (err) {
        console.log('error', err.response?.data);
    }
};

export const EditFilmAction = (formData) => async () => {
    try {
        const result = await quanLyPhimService.editFilmUploadHinh(formData);
        console.log('formData', formData);
        alert('Edit film successfully!');

        history.push('/admin/film');
        console.log(result);
    } catch (err) {
        console.log('error', err.response?.data);
    }
};

export const DeleteFilmAction = (maPhim) => async (dispatch) => {
    try {
        const result = await quanLyPhimService.deleteFilm(maPhim);
        alert('Delete Films Successfully');
        console.log(result);
        dispatch(getApiFilmAction());
    } catch (err) {
        console.log('error', err.response?.data);
    }
};

export const createShowTimesAction = (values) => {
    return async () => {
        try {
            const result = await quanLyPhimService.createShowTimes(values);
            alert('Create ShowTimes successfully!');
        } catch (err) {
            console.log('error', err.response?.data);
        }
    };
};
