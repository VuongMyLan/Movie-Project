import React, { useState, useEffect } from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import { useLocation } from 'react-router-dom';
import './QuanLyLichChieu.css';
import { DatePicker, InputNumber, Select } from 'antd';
import { quanLyCumRapService } from '../../redux/services/QuanLyCumRapService';
import { useFormik } from 'formik';
import { createShowTimesAction } from '../../redux/actions/FilmActions';
import { useDispatch } from 'react-redux';
// import Form from 'antd/lib/form/Form';

import moment from 'moment';
import { Form, Button } from 'antd';
import * as Yup from 'yup';
const { Option } = Select;

export default function QuanLyLichChieu(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            maPhim: parseInt(props.match.params.id),
            cumRap: '',
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: async (values) => {
            dispatch(createShowTimesAction(values));
        },
        validationSchema: Yup.object({
            ngayChieuGioChieu: Yup.string().required('Required'),
            cumRap: Yup.string().required('Required'),
            maRap: Yup.string().required('Required'),

            giaVe: Yup.number().required('Required'),
        }),
    });
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    });
    useEffect(async () => {
        try {
            const response = await quanLyCumRapService.getListCinema();
            setState({
                ...state,
                heThongRapChieu: response.data,
            });
        } catch (error) {
            console.log('err', error.response?.data);
        }
    }, []);
    const location = useLocation();

    const { img, name } = location.state;
    const handleChangeHeThongRap = async (value) => {
        try {
            const response = await quanLyCumRapService.getListMovieTheater(
                value
            );

            //Gán giá trị cụm rạp vào state.cumRap
            setState({
                ...state,
                cumRapChieu: response.data,
            });
        } catch (error) {
            console.log('error', error.response?.data);
        }
        formik.setFieldValue('cumRap', value);
    };
    const convertSelectCinemaList = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
        });
    };
    const convertSelectTheaterList = () => {
        return state.cumRapChieu?.map((cumRap, index) => {
            return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
        });
    };
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value);
    };

    const onChangeDate = (values) => {
        formik.setFieldValue(
            'ngayChieuGioChieu',
            moment(values).format('DD/MM/YYYY hh:mm:ss')
        );
    };
    const onOk = (values) => {
        formik.setFieldValue(
            'ngayChieuGioChieu',
            moment(values).format('DD/MM/YYYY hh:mm:ss')
        );
    };

    const onChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe', values);
    };
    return (
        <AdminTemplate>
            <>
                <div className=' row changeFilm-container justify-content-center'>
                    <h1>Add Showtime </h1>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-5 img-col d-flex flex-column'>
                        <h1> {name}</h1>
                        <img src={img} alt='img-film' />
                    </div>
                    <div className='col-7 name-col align-self-center'>
                        <Form
                            onSubmitCapture={formik.handleSubmit}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item
                                className='form-group'
                                label='Cinema List'
                            >
                                <Select
                                    id='cumRap'
                                    className='select-rap'
                                    onChange={handleChangeHeThongRap}
                                    onBlur={formik.handleBlur}
                                    options={convertSelectCinemaList()}
                                />
                                {formik.touched.cumRap &&
                                formik.errors.cumRap ? (
                                    <div className='text-danger'>
                                        {formik.errors.cumRap}
                                    </div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label='Theater Lists'>
                                <Select
                                    id='maRap'
                                    className='select-rap'
                                    options={convertSelectTheaterList()}
                                    onChange={handleChangeCumRap}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.maRap && formik.errors.maRap ? (
                                    <div className='text-danger'>
                                        {formik.errors.maRap}
                                    </div>
                                ) : null}
                            </Form.Item>

                            <Form.Item label='Ngày chiếu giờ chiếu'>
                                <DatePicker
                                    format='DD/MM/YYYY hh:mm:ss'
                                    showTime
                                    onChange={onChangeDate}
                                    onOk={onOk}
                                    onBlur={formik.handleBlur}
                                    name='ngayChieuGioChieu'
                                />
                                {formik.touched.ngayChieuGioChieu &&
                                formik.errors.ngayChieuGioChieu ? (
                                    <div className='text-danger'>
                                        {formik.errors.ngayChieuGioChieu}
                                    </div>
                                ) : null}
                            </Form.Item>

                            <Form.Item label='Giá vé'>
                                <InputNumber
                                    min={75000}
                                    max={150000}
                                    onBlur={formik.handleBlur}
                                    onChange={onChangeInputNumber}
                                    name='giaVe'
                                />
                                {formik.touched.giaVe && formik.errors.giaVe ? (
                                    <div className='text-danger'>
                                        {formik.errors.giaVe}
                                    </div>
                                ) : null}
                            </Form.Item>

                            <Form.Item label='Function'>
                                <Button htmlType='submit'>
                                    Create ShowTime
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <br />
            </>
        </AdminTemplate>
    );
}
