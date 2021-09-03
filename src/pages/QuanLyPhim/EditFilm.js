import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useSelector } from 'react-redux';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import {
    EditFilmAction,
    getApiFilmDetail,
} from '../../redux/actions/FilmActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { set } from 'lodash';
import { Modal } from 'antd';

export default function EditFilm(props) {
    const dispatch = useDispatch();
    const { filmDetail } = useSelector((state) => state.FilmReducer);
    console.log('filmDetail', filmDetail);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenPhim: filmDetail.tenPhim,
            biDanh: filmDetail.biDanh,
            trailer: filmDetail.trailer,
            hinhAnh: null,
            moTa: filmDetail.moTa,
            danhGia: filmDetail.danhGia,
            ngayKhoiChieu: filmDetail.ngayKhoiChieu,
            maPhim: filmDetail.maPhim,
            manhom: 'GP01',
        },

        onSubmit: (values) => {
            console.log(values);
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

            dispatch(EditFilmAction(formData));
        },
    });
    const { id } = props.match.params;

    const [componentSize, setComponentSize] = useState('default');

    // Modal Antd
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        formik.handleSubmit();
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const handleDatePicker = (value) => {
        console.log('ngayKhoiChieu', moment(value));
        formik.setFieldValue('ngayKhoiChieu', value);
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
                console.log('data', e.target.result);
                setImg(e.target.result);
            };
        }
    };

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };

    useEffect(() => {
        console.log('id', id);
        dispatch(getApiFilmDetail(id));
    }, []);
    return (
        <AdminTemplate>
            <Fragment>
                <h3 className='text-center text-secondary'>Edit Films</h3>
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
                            value={formik.values.tenPhim}
                        />
                    </Form.Item>
                    <Form.Item label='Short Name'>
                        <Input
                            name='biDanh'
                            onChange={formik.handleChange}
                            value={formik.values.biDanh}
                        />
                    </Form.Item>
                    <Form.Item label='Trailer'>
                        <Input
                            name='trailer'
                            onChange={formik.handleChange}
                            value={formik.values.trailer}
                        />
                    </Form.Item>
                    <Form.Item label='Description'>
                        <Input.TextArea
                            name='moTa'
                            onChange={formik.handleChange}
                            value={formik.values.moTa}
                        />
                    </Form.Item>

                    <Form.Item label='Released Date'>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={handleDatePicker}
                            value={moment(formik.values.ngayKhoiChieu)}
                        />
                    </Form.Item>
                    <Form.Item label='Rating'>
                        <InputNumber
                            onChange={handleChangeInputNumber('danhGia')}
                            value={formik.values.danhGia}
                        />
                    </Form.Item>
                    <Form.Item label='Hình ảnh'>
                        <input
                            type='file'
                            onChange={handleChangeFile}
                            accept='image/png, image/jpeg,image/gif,image/png'
                        />
                        <br />
                        <img
                            style={{ width: 150, height: 150 }}
                            src={Img === '' ? filmDetail.hinhAnh : Img}
                            alt='...'
                        />
                    </Form.Item>

                    <Form.Item label='Button'>
                        <Button type='primary' onClick={showModal}>
                            Edit
                        </Button>
                    </Form.Item>

                    <Modal
                        title='You Want To Edit This Films?'
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        width={700}
                    >
                        <Form.Item label='Form Size' name='size'>
                            <Radio.Group>
                                <Radio.Button value='small'>Small</Radio.Button>
                                <Radio.Button value='default'>
                                    Default
                                </Radio.Button>
                                <Radio.Button value='large'>Large</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='Movie Name'>
                            <Input
                                name='tenPhim'
                                onChange={formik.handleChange}
                                value={formik.values.tenPhim}
                            />
                        </Form.Item>
                        <Form.Item label='Short Name'>
                            <Input
                                name='biDanh'
                                onChange={formik.handleChange}
                                value={formik.values.biDanh}
                            />
                        </Form.Item>
                        <Form.Item label='Trailer'>
                            <Input
                                name='trailer'
                                onChange={formik.handleChange}
                                value={formik.values.trailer}
                            />
                        </Form.Item>
                        <Form.Item label='Description'>
                            <Input.TextArea
                                name='moTa'
                                onChange={formik.handleChange}
                                value={formik.values.moTa}
                            />
                        </Form.Item>

                        <Form.Item label='Released Date'>
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                onChange={handleDatePicker}
                                value={moment(formik.values.ngayKhoiChieu)}
                            />
                        </Form.Item>
                        <Form.Item label='Rating'>
                            <InputNumber
                                onChange={handleChangeInputNumber('danhGia')}
                                value={formik.values.danhGia}
                            />
                        </Form.Item>
                        <Form.Item label='Hình ảnh'>
                            <input
                                type='file'
                                onChange={handleChangeFile}
                                accept='image/png, image/jpeg,image/gif,image/png'
                            />
                            <br />
                            <img
                                style={{ width: 150, height: 150 }}
                                src={Img === '' ? filmDetail.hinhAnh : Img}
                                alt='...'
                            />
                        </Form.Item>
                    </Modal>
                </Form>
            </Fragment>
        </AdminTemplate>
    );
}
