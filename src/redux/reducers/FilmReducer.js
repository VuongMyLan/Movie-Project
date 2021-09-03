import {
    SET_FILMS,
    SET_CHI_TIET_PHONG_VE,
    SET_FILM_SAP_CHIEU,
    SET_FILM_DETAIL,
    GET_SCHEDULE,
} from '../actions/types/FilmType';

const stateDefault = {
    arrFilm: [
        { maPhim: 1, tenPhim: 'ABC', hinhAnh: 'https://picsum.photos/200/200' },
    ],
    theaterDetail: [],
    filmDetail: [],
    filmSchedule: [],
    dangChieu: true,
    sapChieu: true,
};

export const FilmReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_FILMS:
            state.arrFilm = action.dataFilms;
            return { ...state };

        case SET_FILM_DETAIL:
            state.filmDetail = action.filmDetail;
            return { ...state };

        case SET_FILM_SAP_CHIEU:
            state.arrFilm = state.arrFilm.filter(
                (film) => film.commingsoon === state.commingsoon
            );
            return { ...state };

        // case SET_FILM_DANG_CHIEU:

        case SET_CHI_TIET_PHONG_VE:
            state.theaterDetail = action.bookingDetail;

            return { ...state };

        case GET_SCHEDULE:
            state.filmSchedule = action.filmSchedule;

            return { ...state };

        default:
            return state;
    }
};
