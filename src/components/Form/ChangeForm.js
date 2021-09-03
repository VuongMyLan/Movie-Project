import React, { useState, useEffect } from 'react';
import './ChangeForm.css';
import { useFormik } from 'formik';
import { DatePicker, Modal } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    AddFilmAction,
    EditFilmAction,
    getApiFilmDetail,
} from '../../redux/actions/FilmActions';
import moment from 'moment';
import PropsType from 'prop-types';

const ChangeForm = (props) => {
    const { filmDetail } = useSelector((state) => state.FilmReducer);
    console.log('filmDetail', filmDetail);

    console.log('props1', props.id);
    const dispatch = useDispatch();
    const [imgSrc, setImgSrc] = useState('');
    const handleSrcImg = () => {
        return filmDetail.hinhAnh;
    };

    useEffect(() => {
        console.log('id', props.id);

        dispatch(getApiFilmDetail(props.id));
    }, []);

    const getInitialValues = () => {
        if (props.isEdit === true) {
            console.log('filmDetail', filmDetail);
            // const { filmDetail } = useSelector((state) => state.FilmReducer);
            // const location = useLocation();
            // const { filmDetail } = location.state;
            return {
                tenPhim:
                    filmDetail.biDanh == undefined ? '' : filmDetail.tenPhim,
                biDanh: filmDetail.biDanh == undefined ? '' : filmDetail.biDanh,
                trailer:
                    filmDetail.trailer == undefined ? '' : filmDetail.trailer,
                hinhAnh: null,
                moTa: filmDetail.moTa == undefined ? '' : filmDetail.moTa,
                danhGia:
                    filmDetail.danhGia == undefined ? '' : filmDetail.danhGia,
                ngayKhoiChieu:
                    filmDetail.ngayKhoiChieu == undefined
                        ? ''
                        : filmDetail.ngayKhoiChieu,
                maPhim: filmDetail.maPhim == undefined ? '' : filmDetail.maPhim,
            };
        } else {
            return {
                tenPhim: '',
                biDanh: '',
                trailer: '',
                hinhAnh: '',
                moTa: '',
                danhGia: 0,
                ngayKhoiChieu: '',
            };
        }
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: getInitialValues(),
        onSubmit: (values) => {
            values.maNhom = 'GP01';

            //Gọi api gửi các giá trị formdata về backend xử lý
            // dispatch action them phim
            if (props.isEdit === true) {
                console.log(values);
                let formData = new FormData();
                for (let key in values) {
                    if (key !== 'hinhAnh') {
                        formData.append(key, values[key]);
                    } else {
                        if (values.hinhAnh !== null) {
                            formData.append(
                                'File',
                                values.hinhAnh,
                                values.hinhAnh.name
                            );
                        }
                    }
                }
                dispatch(EditFilmAction(formData));
                //dispatch action capnhatuploadhinh
            } else {
                values.maPhim = 0;
                let formData = new FormData();
                for (let key in values) {
                    if (key !== 'hinhAnh') {
                        formData.append(key, values[key]);
                    } else {
                        formData.append(
                            'File',
                            values.hinhAnh,
                            values.hinhAnh.name
                        );
                    }
                }
                console.log('add');
                dispatch(AddFilmAction(formData));
            }
        },
    });
    //function for datepicker and choose image from computer
    const changeDate = (values, dateString) => {
        formik.setFieldValue('ngayKhoiChieu', dateString);
        // console.log('value',dateString)
    };
    const handleChangeDatePicker = (value) => {
        // console.log('datepickerchange',);
        let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    };
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/gif' ||
            file.type === 'image/png'
        ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);
            };
            formik.setFieldValue('hinhAnh', file);
        }
    };
    const handleChangeFileEdit = async (e) => {
        let file = e.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/jpg' ||
            file.type === 'image/gif' ||
            file.type === 'image/png'
        ) {
            //Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file);
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result); //Hình base 64
            };
        }
    };

    // useState initial area
    const [visibleModal, setVisibleModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    //function for show modal on click
    const showModal = () => {
        setVisibleModal(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisibleModal(false);
    };
    const handleOk = () => {
        formik.handleSubmit();
        setVisibleModal(false);
    };
    //function render form
    const renderFilmChange = () => {
        return (
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-row '>
                        <div className='col form-group'>
                            <label htmlFor='tenPhim'>Film Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='tenPhim'
                                placeholder='Film Name'
                                onChange={formik.handleChange}
                                value={formik.values.tenPhim}
                            />
                        </div>
                    </div>
                    <div className='form-row '>
                        <div className='col-12 form-group'>
                            <label htmlFor='biDanh'>Film NickName</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Film NickName'
                                id='biDanh'
                                onChange={formik.handleChange}
                                value={formik.values.biDanh}
                            />
                        </div>
                        {/*<div className="col form-group">
                            <label htmlFor="maNhom">Ma nhom</label>
                            <input type="text" className="form-control" id="maNhom" placeholder="Ma nhom"/>
                        </div>*/}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='trailer'>Trailer</label>
                        <input
                            type='text'
                            className='form-control'
                            id='trailer'
                            placeholder='Trailer'
                            onChange={formik.handleChange}
                            value={formik.values.trailer}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='moTa'>Description</label>
                        <textarea
                            className='form-control'
                            id='moTa'
                            rows='3'
                            onChange={formik.handleChange}
                            value={formik.values.moTa}
                        />
                    </div>
                    <div className='form-row '>
                        <div className='col-3 form-group'>
                            <label htmlFor='danhGia'>Rating</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Rating'
                                id='danhGia'
                                onChange={formik.handleChange}
                                value={formik.values.danhGia}
                            />
                        </div>
                        {props.isEdit === true ? (
                            <div className='col form-group'>
                                <label htmlFor='ngayKhoiChieu'>
                                    Premiere day
                                </label>
                                <DatePicker
                                    className='form-control'
                                    onChange={handleChangeDatePicker}
                                    format={'DD/MM/YYYY'}
                                    value={moment(formik.values.ngayKhoiChieu)}
                                />
                            </div>
                        ) : (
                            <div className='col form-group'>
                                <label htmlFor='ngayKhoiChieu'>
                                    Premiere day
                                </label>
                                <DatePicker
                                    className='form-control'
                                    onChange={changeDate}
                                    format={'DD/MM/YYYY'}
                                />
                            </div>
                        )}
                    </div>
                    {/*     <div className='form-row flex-row p-2 d-flex justify-content-around align-items-center'>
                        <div className='p-2 switch-control'>
                            <label> Đang Chiếu: </label>
                            <Switch
                                onChange={handleChangeSwitch('dangChieu')}
                            />
                        </div>
                        <div className='p-2 switch-control'>
                            <label> Sắp Chiếu: </label>
                            <Switch onChange={handleChangeSwitch('sapChieu')} />
                        </div>
                        <div className='p-2 switch-control'>
                            <label> Hot: </label>
                            <Switch onChange={handleChangeSwitch('Hot')} />
                        </div>
                    </div>*/}
                    {props.isEdit === true ? (
                        <div className='form-group '>
                            <label htmlFor='hinhAnh'>Hình Anh:</label>
                            <input
                                type='file'
                                id='hinhAnh'
                                onChange={handleChangeFileEdit}
                                accept='image/png, image/jpeg,image/gif,image/png'
                            />
                            <br />
                            <img
                                className='movie-film-img'
                                src={imgSrc === '' ? handleSrcImg() : imgSrc}
                                alt='edit-img'
                            />
                        </div>
                    ) : (
                        <div className='form-group '>
                            <label htmlFor='hinhAnh'>Hình Anh:</label>
                            <input
                                type='file'
                                id='hinhAnh'
                                onChange={handleChangeFile}
                                accept='image/png, image/jpeg,image/gif,image/png'
                            />
                            <br />
                            <img
                                className='movie-film-img'
                                src={imgSrc}
                                alt='new-film'
                            />
                        </div>
                    )}
                    <br />
                    <div className='d-flex justify-content-center btn-form'>
                        {props.isEdit === true ? (
                            <button
                                onClick={showModal}
                                type='button'
                                className='btn btn-primary mb-2 btn-action'
                            >
                                {' '}
                                save
                            </button>
                        ) : (
                            <button
                                onClick={showModal}
                                type='button'
                                className='btn btn-primary mb-2 btn-action'
                            >
                                {' '}
                                Add
                            </button>
                        )}
                        <NavLink to='/admin/film' className='mb-2  btn-back'>
                            <button
                                type='button'
                                className='btn btn-danger btn-action'
                            >
                                Back
                            </button>
                        </NavLink>
                    </div>
                </form>
                <Modal
                    title='Add user'
                    visible={visibleModal}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <div>Do you want to add this film:</div>
                    <div className='d-flex flex-column'>
                        <div className='p-2'>
                            filmName: {formik.values.tenPhim}
                        </div>
                        <div className='p-2'>
                            filmNickname: {formik.values.biDanh}
                        </div>
                        <div className='p-2'>
                            Trailer: {formik.values.trailer}
                        </div>
                        <div className='p-2'>
                            Description: {formik.values.moTa}
                        </div>
                        <div className='p-2'>
                            rating: {formik.values.danhGia}
                        </div>
                        <div className='p-2'>
                            Premeier day: {formik.values.ngayKhoiChieu}
                        </div>
                    </div>
                </Modal>
            </div>
        );
    };
    return renderFilmChange();
};

ChangeForm.propTypes = {
    isEdit: PropsType.bool,
};

export default ChangeForm;
