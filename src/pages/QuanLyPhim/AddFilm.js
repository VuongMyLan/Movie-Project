import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, Radio, DatePicker, InputNumber } from 'antd';

import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import { AddFilmAction } from '../../redux/actions/FilmActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import * as Yup from 'yup';

export default function AddFilm() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            biDanh: '',
            trailer: '',
            hinhAnh: '',
            moTa: '',
            danhGia: '',
            ngayKhoiChieu: '',
            maPhim: '',
            manhom: 'GP01',
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
            biDanh: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            trailer: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .required('Required'),
            ngayKhoiChieu: Yup.string().required('Required'),

            danhGia: Yup.string().required('Required'),

            hinhAnh: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh != null) {
                        formData.append(
                            'hinhAnh',
                            values.hinhAnh,
                            values.hinhAnh.name
                        );
                    }
                }
            }

            dispatch(AddFilmAction(formData));
        },
    });

    const [componentSize, setComponentSize] = useState('default');

    const handleDatePicker = (value) => {
        formik.setFieldValue(
            'ngayKhoiChieu',
            moment(value).format('DD/MM/YYYY')
        );
    };
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [Img, setImg] = useState('');
    const handleChangeFile = async (e) => {
        let file = e.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/gif' ||
            file.type === 'image/png'
        ) {
            await formik.setFieldValue('hinhAnh', file);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImg(e.target.result);
            };
        }
    };

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };

    return (
        <AdminTemplate>
            <Fragment>
                <h3 className='text-center text-dark'>Add New Films</h3>
                <Form
                    onSubmitCapture={formik.handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout='horizontal'
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >
                    <Form.Item label='Form Size' name='size'>
                        <Radio.Group>
                            <Radio.Button value='small'>Small</Radio.Button>
                            <Radio.Button value='default'>Default</Radio.Button>
                            <Radio.Button value='large'>Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='Movie Name'>
                        <Input
                            name='tenPhim'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tenPhim}
                        />

                        {formik.touched.tenPhim && formik.errors.tenPhim ? (
                            <div className='text-danger'>
                                {formik.errors.tenPhim}
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label='Short Name'>
                        <Input
                            name='biDanh'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.biDanh && formik.errors.biDanh ? (
                            <div className='text-danger'>
                                {formik.errors.biDanh}
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label='Trailer'>
                        <Input
                            name='trailer'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.trailer && formik.errors.trailer ? (
                            <div className='text-danger'>
                                {formik.errors.trailer}
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label='Description'>
                        <Input.TextArea
                            name='moTa'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item label='Released Date'>
                        <DatePicker
                            name='ngayKhoiChieu'
                            onChange={handleDatePicker}
                            onBlur={formik.handleBlur}
                            format={'DD/MM/YYYY'}
                        />
                        {formik.touched.ngayKhoiChieu &&
                        formik.errors.ngayKhoiChieu ? (
                            <div className='text-danger'>
                                {formik.errors.ngayKhoiChieu}
                            </div>
                        ) : null}
                    </Form.Item>

                    <Form.Item label='Rating'>
                        <InputNumber
                            min={1}
                            max={10}
                            name='danhGia'
                            onChange={handleChangeInputNumber('danhGia')}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.danhGia && formik.errors.danhGia ? (
                            <div className='text-danger'>
                                {formik.errors.danhGia}
                            </div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label='Hình ảnh'>
                        <input
                            name='hinhAnh'
                            type='file'
                            onChange={handleChangeFile}
                            accept='image/png, image/jpeg,image/gif,image/png'
                            onBlur={formik.handleBlur}
                        />
                        <br />
                        <img
                            style={{ width: 150, height: 150 }}
                            src={Img}
                            alt='...'
                        />
                        {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
                            <div className='text-danger'>
                                {formik.errors.hinhAnh}
                            </div>
                        ) : null}
                    </Form.Item>

                    <Form.Item label='Button'>
                        <Button onClick={formik.handleSubmit}>Add Films</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        </AdminTemplate>
    );
}
