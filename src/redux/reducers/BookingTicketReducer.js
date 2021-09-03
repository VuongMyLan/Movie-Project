import {
    BOOK_CHAIR,
    CHANGE_TAB,
    CHANGE_TAB_ACTIVE,
    FINISH_BOOKING,
} from '../actions/types/FilmType';

const stateDefault = {
    bookedChair: [],
    tabActive: '1',
    bookedByOthers: [
        {
            daDat: false,
            giaVe: 75000,
            loaiGhe: 'Thuong',
            maGhe: 53481,
            maRap: 489,
            stt: '01',
            taiKhoanNguoiDat: null,
            tenGhe: '01',
        },
    ],
};

export const BookingTicketReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case BOOK_CHAIR: {
            let updateBookChair = [...state.bookedChair];
            let index = updateBookChair.findIndex(
                (chair) => chair.maGhe === action.bookedChair.maGhe
            );
            if (index != -1) {
                updateBookChair.splice(index, 1);
            } else {
                updateBookChair.push(action.bookedChair);
            }
            state.bookedChair = updateBookChair;

            return { ...state };
        }

        case FINISH_BOOKING:
            state.bookedChair = [];
            return { ...state };

        case CHANGE_TAB:
            state.tabActive = '2';
            return { ...state };

        case CHANGE_TAB_ACTIVE:
            state.tabActive = action.number;
            return { ...state };

        default:
            return state;
    }
};
