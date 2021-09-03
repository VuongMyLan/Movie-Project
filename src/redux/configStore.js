import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { FilmReducer } from './reducers/FilmReducer';
import { CinemaReducer } from './reducers/CinemaReducer';
import { UserReducer } from './reducers/UserReducer';
import { BookingTicketReducer } from './reducers/BookingTicketReducer';
import { LoadingReducer } from './reducers/LoadingReducer';

const rootReducer = combineReducers({
    FilmReducer,
    CinemaReducer,
    UserReducer,
    BookingTicketReducer,
    LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
