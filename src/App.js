import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
// import Home from "./Pages/Home/Home";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
//import AdminPage from './pages/AdminPage/AdminPage';

import QuanLyPhim from './pages/QuanLyPhim/QuanLyPhim';
import QuanLyLichChieu from './pages/QuanLyRap/QuanLyLichChieu';
import QuanLyNguoiDung from './pages/QuanLyNguoiDung/QuanLyNguoiDung';

import Loading from './components/Loading/Loading';

import AddUser from './pages/QuanLyNguoiDung/AddUser';
import EditUSer from './pages/QuanLyNguoiDung/EditUser';
import EditFilm from './pages/QuanLyPhim/EditFilm';
import AddFilm from './pages/QuanLyPhim/AddFilm';
export const history = createBrowserHistory();

function App() {
    // render App
    return (
        <div className='App'>
            <Router history={history}>
                <Loading />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/detail/:postId' exact component={Detail} />
                    <Route path='/checkout/:id' exact component={Checkout} />

                    <Route path='/admin/film' exact component={QuanLyPhim} />

                    <Route path='/admin/film/:id' exact component={EditFilm} />
                    <Route path='/admin/addfilm' exact component={AddFilm} />
                    <Route
                        path='/admin/film/showtime/:id'
                        exact
                        component={QuanLyLichChieu}
                    />
                    <Route
                        path='/admin/userinfo'
                        exact
                        component={QuanLyNguoiDung}
                    />
                    <Route
                        path='/admin/userinfo/addnew'
                        exact
                        component={AddUser}
                    />
                    <Route
                        path='/admin/userinfo/edit/:id'
                        exact
                        component={EditUSer}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
