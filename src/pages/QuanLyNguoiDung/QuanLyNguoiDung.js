import React, { useEffect } from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getListUSer } from '../../redux/actions/UserAction';
import { NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import ListItemContainer from '../../components/Admin/ListItemContainer';
import { Input } from 'antd';
import './QuanLyNguoiDung.css';
const { Search } = Input;

export default function QuanLyNguoiDung() {
    //thanh them va search
    //
    //                     list phim hoac nguoi dung
    const { arrUser } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    useEffect(async () => {
        const action = await getListUSer();
        dispatch(action);
    }, []);

    arrUser.forEach((user, index) => {
        user.Id = index;
    });

    const onSearch = (value) => {
        dispatch(getListUSer(value));
    };
    console.log(arrUser);
    return (
        <div>
            <AdminTemplate>
                <>
                    <div className='text-center mb-2 dashboard__content'>
                        <div className='text-center dashboarduser__header'>
                            {' '}
                        </div>
                    </div>
                    <div className='row justify-content-between align-items-center addfilm__button'>
                        <NavLink
                            to='/admin/userinfo/addnew'
                            className='navLink col-2'
                        >
                            <button className='btn-add '>Add User</button>
                        </NavLink>

                        <div className='form-inline col-7 mt-2'>
                            <Search
                                style={{ width: '80%' }}
                                className=' mr-sm-2 mb-5'
                                type='search'
                                placeholder='Input username'
                                aria-label='Search'
                                enterButton={<SearchOutlined />}
                                onSearch={onSearch}
                            />
                        </div>
                    </div>
                    <br />
                    <ListItemContainer
                        ControlRender='UserControl'
                        filmData={arrUser}
                    />
                </>
            </AdminTemplate>
        </div>
    );
}
