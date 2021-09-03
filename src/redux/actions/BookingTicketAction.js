import {
    CHANGE_TAB,
    FINISH_BOOKING,
    SET_CINEMA,
} from '../actions/types/FilmType';

import { quanLyGheService } from '../services/QuanLyGheService';
import { bookingroomAction } from './FilmActions';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';

export const bookingTicketAction = (bookingInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            let result = await quanLyGheService.bookingTicket(bookingInfo);
            await dispatch(bookingroomAction(bookingInfo.maLichChieu));
            console.log('Result', result);
            dispatch({
                type: FINISH_BOOKING,
            });
            alert('Booking successfully');
            await dispatch(hideLoadingAction);
            dispatch({
                type: CHANGE_TAB,
            });
            console.log('dispatch', dispatch);
        } catch (error) {
            alert(error.response?.data);
            console.log('error', error.response?.data);
        }
        await dispatch(hideLoadingAction);
    };
};
