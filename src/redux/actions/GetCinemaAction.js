import { SET_CINEMA } from '../actions/types/FilmType';
import { quanLyCumRapService } from '../services/QuanLyCumRapService';

export const getCinemaAction = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyCumRapService.getCinema();
            const action = {
                type: SET_CINEMA,
                dataCinema: result.data,
            };
            dispatch(action);
        } catch (error) {
            console.log('error', error.response.data);
        }
    };
};
