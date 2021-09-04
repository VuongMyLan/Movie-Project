import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../asset/web-logo.png';
import { Input } from 'antd';
import { getApiFilmAction } from '../../redux/actions/FilmActions';

import './Navbar.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Anchor } from 'antd';
import _ from 'lodash';

export default function Navbar() {
    const { Link } = Anchor;
    const { Search } = Input;
    const dispatch = useDispatch();
    const renderLogout = () => {
        const action = {
            type: 'LOG_OUT',
            userLogin: {},
        };
        dispatch(action);
    };

    const renderLogin = () => {
        const { userLogin } = useSelector((state) => state.UserReducer);

        if (_.isEmpty(userLogin)) {
            return (
                <button
                    className='btn btn-outline-primay my-2 my-sm-0 px-2 login__button font-weight-bold'
                    type='submit'
                >
                    <NavLink to='/login'>
                        <i className='fa fa-user'></i> Log in / Register
                    </NavLink>
                </button>
            );
        } else {
            return (
                <div className='nav-item dropdown'>
                    <a
                        className='nav-link dropdown-toggle pt-2'
                        href='#'
                        id='dropdownId'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        Hello {userLogin.taiKhoan}
                    </a>
                    <div
                        className='dropdown-menu bg-white text-dark'
                        aria-labelledby='dropdownId'
                    >
                        <NavLink
                            className='dropdown-item text-dark bg-white display-6'
                            to='/profile'
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            className='dropdown-item'
                            to='/home'
                            onClick={renderLogout}
                        >
                            Log out
                        </NavLink>
                    </div>
                </div>
            );
        }
    };

    // const onSearch = (value) => {
    //     console.log(value);
    //     const action = getApiFilmAction(value);
    //     dispatch(action);
    // };
    // const renderSearch = () => {
    //     return (
    //         <Space direction='vertical'>
    //             <Search
    //                 placeholder='Search Films'
    //                 onSearch={onSearch}
    //                 style={{ width: 200 }}
    //             />
    //         </Space>
    //     );
    // };

    return (
        <div className='navbartitle'>
            <nav className='navbar  fixed-top navbar-expand-lg navbar-light bg-light'>
                <div className='logo-container'>
                    <NavLink to='/'>
                        <img alt='logo' src={logo} className='logo-web' />
                    </NavLink>
                </div>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon' />
                </button>
                <div
                    className='collapse navbar-collapse justify-content-center order-2'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav mx-auto'>
                        <li className='nav-item'>
                            <NavLink to='/home' className='nav-link' href='#'>
                                Home <span className='sr-only'>(current)</span>
                            </NavLink>
                        </li>
                        <li>
                            <Anchor>
                                <NavLink
                                    to='/home'
                                    className='nav-item nav-link'
                                >
                                    {' '}
                                    <Link
                                        href='#myTable'
                                        title='Theaters'
                                    />{' '}
                                </NavLink>
                            </Anchor>
                        </li>
                    </ul>
                    {/* <span className='nav-item'>{renderSearch()}</span> */}
                    <div className='loginright'>
                        <form className=' form-inline my-2 my-lg-0 text-dark'>
                            {renderLogin()}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
