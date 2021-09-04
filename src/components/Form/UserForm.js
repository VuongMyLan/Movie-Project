import React, { useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import './UserFom.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'antd';
import PropsType from 'prop-types';
import { addUser, editUser } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';

const UserForm = ({ isEdit }) => {
    // add or edit
    const dispatch = useDispatch();
    const getInitialValue = () => {
        if (isEdit === true) {
            const location = useLocation();
            console.log('location', location);
            const { user } = location.state;
            return {
                taiKhoan: user.taiKhoan,
                email: user.email,
                matKhau: user.matKhau,
                soDt: user.soDt,
                hoTen: user.hoTen,
                maLoaiNguoiDung: user.maLoaiNguoiDung,
            };
        } else {
            return {
                taiKhoan: '',
                email: '',
                matKhau: '',
                soDt: '',
                hoTen: '',
                maLoaiNguoiDung: '',
            };
        }
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: getInitialValue(),
        validationSchema: Yup.object({
            taiKhoan: Yup.string()
                .min(6, 'Minumum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Please enter account'),
            matKhau: Yup.string()
                .min(8, 'Minumum 8 characters')
                .max(15, 'Maximum 15 characters')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                    'password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
                )
                .required('Please enter password'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Please enter user email'),
            soDt: Yup.string()
                .required('Please enter phone number')
                .matches(/^[0-9]+$/, 'Please enter only number'),
            hoTen: Yup.string()
                .min(6, 'Minumum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Please enter user name'),
            maLoaiNguoiDung: Yup.string()
                .ensure()
                .required('Please enter user role'),
        }),
        onSubmit: (values) => {
            values.maNhom = 'GP01';
            if (isEdit === true) {
                dispatch(editUser(values));
                //action edit user
            } else {
                //adtion add user
                dispatch(addUser(values));
            }
            // dispatch action them user
        },
    });
    const { touched, errors } = formik;
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const handleOk = () => {
        formik.handleSubmit();
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    return (
        <div className='userform__content'>
            <form
                onSubmit={formik.handleSubmit}
                className='userform__content__label'
            >
                <div className='form-row user-form '>
                    <div className='form-group col-md-4 ml-3 user-form__content'>
                        <label htmlFor='taiKhoan'>UserName</label>
                        <input
                            type='text'
                            className='form-control'
                            id='taiKhoan'
                            placeholder='Tài Khoản'
                            name='taiKhoan'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.taiKhoan}
                        />
                        {touched.taiKhoan && errors.taiKhoan && (
                            <p className='text-red'>{errors.taiKhoan}</p>
                        )}
                    </div>
                    <div className='form-group col-md-4 ml-3  user-form__content'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder='Email'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {touched.email && errors.email && (
                            <p className='text-red'>{errors.email}</p>
                        )}
                    </div>
                </div>
                <div className='form-row user-form'>
                    <div className='form-group col-md-4 ml-3  user-form__content'>
                        <label htmlFor='matKhau'>Password:</label>
                        <input
                            type='text'
                            className='form-control'
                            id='matKhau'
                            placeholder='Mật Khẩu'
                            name='matKhau'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.matKhau}
                        />
                        {touched.matKhau && errors.matKhau && (
                            <p className='text-red'>{errors.matKhau}</p>
                        )}
                    </div>
                    <div className='form-group col-md-4 ml-3  user-form__content'>
                        <label htmlFor='inputPassword4'>Phone Number:</label>
                        <input
                            type='text'
                            className='form-control'
                            id='soDt'
                            placeholder='Số Điện Thoại'
                            name='soDt'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.soDt}
                        />
                        {touched.soDt && errors.soDt && (
                            <p className='text-red'>{errors.soDt}</p>
                        )}
                    </div>
                </div>
                <div className='form-row user-form'>
                    <div className='form-group col-md-4 ml-3  user-form__content'>
                        <label htmlFor='hoTen'>Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            id='hoTen'
                            placeholder='Họ Và Tên'
                            name='hoTen'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.hoTen}
                        />
                        {touched.hoTen && errors.hoTen && (
                            <p className='text-red'>{errors.hoTen}</p>
                        )}
                    </div>
                    <div className='form-group col-md-4 ml-3  user-form__content'>
                        <label htmlFor='inputState'>User Type:</label>
                        <select
                            id='maLoaiNguoiDung'
                            className='form-control'
                            name='maLoaiNguoiDung'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.maLoaiNguoiDung}
                        >
                            <option>Chọn Loại người dùng</option>
                            <option value='KhachHang'>KhachHang</option>
                            <option value='QuanTri'>QuanTri</option>
                        </select>
                        {touched.maLoaiNguoiDung && errors.maLoaiNguoiDung && (
                            <p className='text-red'>{errors.maLoaiNguoiDung}</p>
                        )}
                    </div>
                </div>
            </form>
            <div className=' form-row user-form d-flex flex-row justify-content-center'>
                <NavLink to='/admin/userinfo' className='mb-2 btn-back'>
                    <button
                        type='button'
                        className='b-2 mb-2 btn-action button__action'
                        style={{ width: 100 }}
                    >
                        Back
                    </button>
                </NavLink>
                {isEdit === true ? (
                    <button
                        onClick={showModal}
                        type='button'
                        className='mb-2 btn-action'
                        style={{ width: 100 }}
                    >
                        {' '}
                        Save
                    </button>
                ) : (
                    <button
                        disabled={!(formik.isValid && formik.dirty)}
                        onClick={showModal}
                        type='button'
                        className='b-2 btn-action button__save'
                    >
                        {' '}
                        Add User
                    </button>
                )}
            </div>
            <Modal
                title='Add user'
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>Do you want to add this user:</div>
                <div className='d-flex flex-column'>
                    <div className='p-2'>
                        UserName: {formik.values.taiKhoan}
                    </div>
                    <div className='p-2'>Password: {formik.values.matKhau}</div>
                    <div className='p-2'>Email: {formik.values.email}</div>
                    <div className='p-2'>
                        Phone Number: {formik.values.soDt}
                    </div>
                    <div className='p-2'>Name: {formik.values.hoTen}</div>
                    <div className='p-2'>
                        Vai Trò: {formik.values.maLoaiNguoiDung}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

UserForm.propTypes = {
    isEdit: PropsType.bool,
};

export default UserForm;
