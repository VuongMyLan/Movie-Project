import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Background from '../../asset/img/bg2.jpg';
import './Login.css';
import Logo from '../../asset/web-logo.png';

import { Link, NavLink } from 'react-router-dom';
import { userLoginAction } from '../../redux/actions/UserAction';

const Login = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },

        onSubmit: (values) => {
            dispatch(userLoginAction(values));
        },
    });

    return (
        <div
            className='Login-Container'
            style={{
                backgroundImage: `url(${Background})`,
            }}
        >
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-container form__login'>
                            <form
                                className='my-form form__logincontent'
                                onSubmit={formik.handleSubmit}
                            >
                                <Link to='/'>
                                    <button className='btn btn-secondary btn-close-login rounded-circle'>
                                        <i className='fas fa-times' />
                                    </button>
                                </Link>
                                <div className='form-header'>
                                    <img
                                        src={Logo}
                                        alt='login-logo rounded mx-auto d-block'
                                        className='login-logo'
                                    />
                                    <h4>The world of Cinema is in your hand</h4>
                                </div>

                                <div
                                    className='tab-content'
                                    id='nav-tabContent'
                                >
                                    <div className='form-group mt-5 text__title text-white'>
                                        <label htmlFor='username-login text__title_username'>
                                            User name :
                                        </label>
                                        <input
                                            type='taiKhoan'
                                            name='taiKhoan'
                                            className='form-control'
                                            id='username-login'
                                            aria-describedby='emailHelp'
                                            placeholder='Enter your username'
                                            onChange={formik.handleChange}
                                            value={formik.values.taiKhoan}
                                        />
                                    </div>
                                    <div className='form-group text__title'>
                                        <label htmlFor='login-password '>
                                            Password:
                                        </label>
                                        <input
                                            type='password'
                                            name='matKhau'
                                            className='form-control'
                                            id='login-password'
                                            placeholder='Password'
                                            autoComplete=''
                                            onChange={formik.handleChange}
                                            value={formik.values.matKhau}
                                        />
                                    </div>

                                    <div className='form-button'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary px-5'
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                    <div className='text-right mt-3 mb-0 register__message text-white'>
                                        <NavLink
                                            to='/register'
                                            className='text-white'
                                        >
                                            Do not have an account? Press to
                                            register one
                                        </NavLink>
                                    </div>
                                </div>
                                <div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
