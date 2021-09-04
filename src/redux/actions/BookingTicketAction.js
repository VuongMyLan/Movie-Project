import { CHANGE_TAB, FINISH_BOOKING } from '../actions/types/FilmType';

import { quanLyGheService } from '../services/QuanLyGheService';
import { bookingroomAction } from './FilmActions';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';

export const bookingTicketAction = (bookingInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            let result = await quanLyGheService.bookingTicket(bookingInfo);
            await dispatch(bookingroomAction(bookingInfo.maLichChieu));

            dispatch({
                type: FINISH_BOOKING,
            });
            alert('Booking successfully');
            await dispatch(hideLoadingAction);
            dispatch({
                type: CHANGE_TAB,
            });
        } catch (error) {
            alert(error.response?.data);
            console.log('error', error.response?.data);
        }
        await dispatch(hideLoadingAction);
    };
};
