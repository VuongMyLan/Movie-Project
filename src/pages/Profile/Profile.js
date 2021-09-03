import React, { useEffect, useState } from 'react';
import HomeTemplate from '../../components/Templates/HomeTemplate/HomeTemplate';
import { Tabs } from 'antd';
import './Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { userHistoryAction } from '../../redux/actions/UserAction';

import { BookingResult } from '../Checkout/Checkout';
import { useFormik } from 'formik';
import { Form, Input, Button, Radio } from 'antd';
import { editUser } from '../../redux/actions/UserAction';

const { TabPane } = Tabs;

export default function Profile() {
    const dispatch = useDispatch();
    const { userHistory } = useSelector((state) => state.UserReducer);
    const { userLogin } = useSelector((state) => state.UserReducer);
    console.log('userLogin', userLogin.taiKhoan);

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        const action = userHistoryAction(userLogin);
        dispatch(action);
    }, []);
    console.log('userHistory', userHistory);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userHistory.taiKhoan,
            matKhau: userHistory.matKhau,
            email: userHistory.email,
            soDT: userHistory.soDT,
            maNhom: 'GP01',
            maLoaiNguoiDung: 'KhachHang',
            hoTen: userHistory.hoTen,
        },

        onSubmit: (values) => {
            console.log('values', values);
            const action = editUser(values);
            dispatch(action);
        },
    });

    const handleClick = () => {
        formik.handleSubmit();
    };

    return (
        <HomeTemplate>
            <div className='container profile__content'>
                <Tabs tabPosition={'left'}>
                    <TabPane tab='General Information' key='1'>
                        <h2 className='text-center'>
                            Hello {userHistory.taiKhoan} !
                        </h2>

                        <div className='profile__img text-center'>
                            <img
                                src='/img/Bunny3.jpg'
                                style={{ heigh: 200, width: 200 }}
                            ></img>
                        </div>

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
                                    <Radio.Button value='small'>
                                        Small
                                    </Radio.Button>
                                    <Radio.Button value='default'>
                                        Default
                                    </Radio.Button>
                                    <Radio.Button value='large'>
                                        Large
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label='Username: '>
                                <Input
                                    disabled={true}
                                    name='taiKhoan'
                                    onChange={formik.handleChange}
                                    value={formik.values.taiKhoan}
                                />
                            </Form.Item>
                            <Form.Item label='Password: '>
                                <Input
                                    name='matKhau'
                                    onChange={formik.handleChange}
                                    value={formik.values.matKhau}
                                />
                            </Form.Item>
                            <Form.Item label='Email: '>
                                <Input
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </Form.Item>
                            <Form.Item label='Phone Number: '>
                                <Input
                                    name='soDT'
                                    onChange={formik.handleChange}
                                    value={formik.values.soDT}
                                />
                            </Form.Item>
                            <Form.Item label='Name: '>
                                <Input
                                    name='hoTen'
                                    onChange={formik.handleChange}
                                    value={formik.values.hoTen}
                                />
                            </Form.Item>
                            <Form.Item label='Update'>
                                <Button type='submit' onClick={handleClick}>
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab='Historical transations' key='2'>
                        <BookingResult />
                    </TabPane>
                </Tabs>
            </div>
        </HomeTemplate>
    );
}
