import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Background from '../../asset/img/bg2.jpg';
import './Register.css';
import Logo from '../../asset/web-logo.png';
import { NavLink } from 'react-router-dom';
import { userRegisterAction } from '../../redux/actions/UserAction';
import * as Yup from 'yup';

const Register = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: '',
            hoTen: '',
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string()
                .min(6, 'Minumum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Requuired'),
            matKhau: Yup.string()
                .min(8, 'Minumum 8 characters')
                .max(15, 'Maximum 15 characters')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                    'password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
                )
                .required('Requuired'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Required!'),
            soDt: Yup.string()
                .required()
                .matches(/^[0-9]+$/, 'Please enter only number'),
            hoTen: Yup.string()
                .min(6, 'Minumum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required'),
            maNhom: Yup.string().required('Required'),
        }),

        onSubmit: (values) => {
            dispatch(userRegisterAction(values));

            console.log(values);
        },
    });
    const { touched, errors } = formik;

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
                        <div className='form-container register__form'>
                            <form
                                className='my-form'
                                onSubmit={formik.handleSubmit}
                            >
                                <NavLink to='/'>
                                    <button className='btn btn-secondary btn-close-login rounded-circle'>
                                        <i className='fas fa-times' />
                                    </button>
                                </NavLink>
                                <div className='form-header'>
                                    <img
                                        src={Logo}
                                        alt='login-logo rounded mx-auto d-block'
                                        className='login-logo'
                                    />
                                    <h4>The world of Cinema is in your hand</h4>
                                </div>

                                <div className='form-group mt-3 text-white '>
                                    <label htmlFor='account-login'>
                                        User name:{' '}
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='account-login'
                                        aria-describedby='account'
                                        placeholder='Enter your username'
                                        name='taiKhoan'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {touched.taiKhoan && errors.taiKhoan && (
                                        <p className='text-white'>
                                            {errors.taiKhoan}
                                        </p>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='signup-password'>
                                        Password:
                                    </label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='signup-password'
                                        placeholder='Password'
                                        autoComplete=''
                                        name='matKhau'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {touched.matKhau && errors.matKhau && (
                                        <p className='text-white'>
                                            {errors.matKhau}
                                        </p>
                                    )}
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email-signup'>
                                        Email:{' '}
                                    </label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email-signup'
                                        aria-describedby='emailHelp'
                                        placeholder='Enter your email'
                                        name='email'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {touched.email && errors.email && (
                                        <p className='text-white'>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='phone-number'>
                                        Phone number:
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='phone-number'
                                        aria-describedby='phonenumber'
                                        placeholder='Phone number'
                                        name='soDt'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {touched.soDt && errors.soDt && (
                                        <p className='text-white'>
                                            {errors.soDt}
                                        </p>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='full-name'>Name:</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='full-name'
                                        aria-describedby='fullName'
                                        placeholder='Your full name'
                                        name='hoTen'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {touched.hoTen && errors.hoTen && (
                                        <p className='text-white'>
                                            {errors.hoTen}
                                        </p>
                                    )}
                                </div>
                                <div className='form-group text-white my-1'>
                                    <p>Mã nhóm: </p>
                                    <select
                                        name='maNhom'
                                        className='form-control my-2'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value='none'>
                                            Chose one group
                                        </option>
                                        <option value='GP01'>Group 1</option>
                                        <option value='GP02'>Group 2</option>
                                        <option value='GP03'>Group 3</option>
                                        <option value='GP04'>Group 4</option>
                                    </select>
                                    {touched.maNhom && errors.maNhom && (
                                        <p className='text-white'>
                                            {errors.maNhom}
                                        </p>
                                    )}
                                </div>
                                <div className='text-center'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary my-2 px-5'
                                    >
                                        Register
                                    </button>
                                    <div className='my-0 text-right text-white login__button'>
                                        <NavLink
                                            to='/login'
                                            className='text-white'
                                        >
                                            <p>Want to Login?</p>
                                        </NavLink>
                                    </div>
                                </div>

                                <div className='row'></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
