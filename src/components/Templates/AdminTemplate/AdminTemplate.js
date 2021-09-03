import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { userHistoryAction } from '../../../redux/actions/UserAction';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FileOutlined,
} from '@ant-design/icons';
import './AdminTemplate.css';
import { USER_LOGIN } from '../../../util/setting';
import { history } from '../../../App';
import backgroundadmin1 from '../../../asset/img/backgroundadmin1.jpg';
//

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate(props) {
    const dispatch = useDispatch();
    const { userLogin } = useSelector((state) => state.UserReducer);

    // console.log('userLogin', userLogin);

    const [state, setState] = useState({
        collapsed: false,
    });
    const toggle = () => {
        setState({
            ...state,
            collapsed: !state.collapsed,
        });
    };

    useEffect(() => {
        const action = userHistoryAction(userLogin);
        dispatch(action);
    }, []);

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !');
        return <Redirect to='/' />;
    }

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Không có quyền truy cập vào trang này !');
        return <Redirect to='/' />;
    }

    const renderLogout = () => {
        const action = {
            type: 'LOG_OUT',
        };
        dispatch(action);
        history.push('/home');
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={state.collapsed}>
                <div className='logo text-center py-2'>
                    <img
                        className='img__profile'
                        style={{ borderRadius: '50%' }}
                        src='https://picsum.photos/50/50'
                        alt='...'
                    />
                    <div className='text-white mt-3'>
                        Hello {userLogin.taiKhoan} !
                    </div>
                    <button
                        className='btn btn-secondary'
                        onClick={renderLogout}
                    >
                        Log out
                    </button>
                </div>
                <Menu theme='dark' mode='inline' className='admin__header'>
                    <SubMenu key='sub1' icon={<FileOutlined />} title='Films'>
                        <Menu.Item key='1' icon={<FileOutlined />}>
                            <NavLink to='/admin/film'>Quản lý phim</NavLink>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<FileOutlined />}>
                            <NavLink to='/admin/addfilm'>Add new</NavLink>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key='3' icon={<UserOutlined />}>
                        <NavLink to='/admin/userinfo'>
                            Quản lý Người Dùng
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className='site-layout'>
                <Header
                    className='site-layout-background text-white p-2 admin__header'
                    style={{ padding: 0, fontSize: 20 }}
                >
                    {React.createElement(
                        state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: toggle,
                        }
                    )}
                </Header>
                <Content
                    className='site-layout-background'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 1000,
                        backgroundImage: 'url("/img/backgroundadmin3.jpg")',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}

AdminTemplate.propTypes = {
    children: PropTypes.element.isRequired,
};

// if(userLogin.maLoaiNguoiDung!== 'QuanTri') {
//     alert('Không có quyền truy cập vào trang này !');
//     return <Redirect to='/' />
// }
