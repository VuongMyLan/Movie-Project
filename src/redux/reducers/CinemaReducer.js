import { SET_CINEMA } from '../actions/types/FilmType';

const stateDefault = {
    cinemaData: [{ cumRap: 'BHD' }],
};

export const CinemaReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CINEMA:
            state.cinemaData = action.dataCinema;
            return { ...state };

        default:
            return { ...state };
    }
};
