import React, { Fragment } from 'react';
//import ListItem from './ListItem';
import PropsType from 'prop-types';
import { Table } from 'antd';
import { NavLink } from 'react-router-dom';

import './ListItemContainer.css';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions/UserAction';
import { DeleteFilmAction } from '../../redux/actions/FilmActions';
import { Popover } from 'antd';

const ListItemContainer = ({ filmData, ControlRender }) => {
    // render list item
    const dispatch = useDispatch();
    const FilmColumns = [
        {
            title: 'Film Code',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            // eslint-disable-next-line react/display-name
            render: (text, film) => <span>{film.maPhim}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            responsive: ['sm'],
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            // eslint-disable-next-line react/display-name
            render: (text, film) => <span>{film.tenPhim}</span>,
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            // eslint-disable-next-line react/display-name
            render: (text, film) => (
                <img
                    src={film.hinhAnh}
                    alt={'...'}
                    width={50}
                    height={50}
                    onError={(e) => {
                        e.target.src = `https://picsum.photos/id/200/50/50`;
                    }}
                />
            ),
        },
        {
            title: 'Description',
            dataIndex: 'moTa',
            key: 'moTa',
            width: '40%',
            responsive: ['lg'],
            // eslint-disable-next-line react/display-name
            render: (text, film) => (
                <section>
                    {film.moTa?.length > 50
                        ? film.moTa.substr(0, 50) + '...'
                        : film.moTa}
                </section>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (text, film) => {
                return (
                    <Fragment>
                        <NavLink
                            className=' mr-2 text-2xl'
                            to={{
                                pathname: `/admin/film/${film.maPhim}`,
                                state: {
                                    filmDetail: film,
                                    id: film.maPhim,
                                },
                            }}
                        >
                            <Popover content={'Edit'}>
                                <i className='fa fa-pencil-alt'></i>
                            </Popover>
                        </NavLink>
                        <span
                            style={{ cursor: 'pointer' }}
                            className='text-2xl'
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Bạn có chắc muốn xoá phim ' +
                                            film.tenPhim
                                    )
                                ) {
                                    dispatch(DeleteFilmAction(film.maPhim));
                                }
                            }}
                        >
                            <Popover content={'Delete'}>
                                <i className='fa fa-trash-alt text-danger mr-2'></i>
                            </Popover>
                        </span>

                        <NavLink
                            className=' mr-2 text-2xl'
                            to={{
                                pathname: `/admin/film/showtime/${film.maPhim}`,
                                state: {
                                    img: film.hinhAnh,
                                    name: film.tenPhim,
                                },
                            }}
                            /*onClick={() => {
                                localStorage.setItem(
                                    'filmParams',
                                    JSON.stringify(film)
                                );
                            }}*/
                        >
                            <Popover content={'Create ShowTimes'}>
                                <i className='fa fa-calendar-plus text-success'></i>
                            </Popover>
                        </NavLink>
                    </Fragment>
                );
            },
        },
    ];
    const UserColumns = [
        {
            title: 'Number',
            dataIndex: 'Id',
            key: 'Id',
            sorter: (a, b) => a.Id - b.Id,
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.Id}</span>,
        },
        {
            title: 'User Name',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            width: '20%',
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = b.taiKhoan.toLowerCase().trim();
                if (taiKhoanA > taiKhoanB) {
                    return 1;
                }
                return -1;
            },
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.taiKhoan}</span>,
        },
        {
            title: 'Password',
            dataIndex: 'matKhau',
            key: 'matKhau',
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.matKhau}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'hoTen',
            width: '20%',
            key: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();
                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.hoTen}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.email}</span>,
        },
        {
            title: 'Phone Number',
            dataIndex: 'soDt',
            key: 'soDt',
            // eslint-disable-next-line react/display-name
            render: (text, User) => <span>{User.soDt}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            // eslint-disable-next-line react/display-name
            render: (text, User) => {
                return (
                    <Fragment>
                        <NavLink
                            className=' mr-2  text-2xl'
                            to={{
                                pathname: `/admin/userinfo/edit/${User.Id}`,
                                state: {
                                    user: User,
                                },
                            }}
                        >
                            <Popover content={'Edit'}>
                                <i className='fa fa-pencil-alt mr-2'></i>
                            </Popover>
                        </NavLink>
                        <span
                            style={{ cursor: 'pointer' }}
                            className='text-2xl'
                            onClick={() => {
                                //Gọi action xoá
                                if (
                                    window.confirm(
                                        'Bạn có chắc muốn xoá người dùng ' +
                                            User.hoTen
                                    )
                                ) {
                                    //Gọi action
                                    // dispatch(xoaPhimAction(film.maPhim));
                                    dispatch(deleteUser(User.taiKhoan));
                                    alert('xóa người dùng thành công');
                                }
                            }}
                        >
                            <Popover content={'Delete'}>
                                <i className='fa fa-trash-alt text-danger mr-2'></i>
                            </Popover>
                        </span>
                    </Fragment>
                );
            },
        },
    ];
    const renderTable = () => {
        return (
            <div>
                {ControlRender === 'FilmsControl' ? (
                    <div className='admin-table'>
                        <Table
                            columns={FilmColumns}
                            dataSource={filmData}
                            rowKey='maPhim'
                        />
                    </div>
                ) : (
                    <div className='admin-table'>
                        <Table
                            columns={UserColumns}
                            dataSource={filmData}
                            rowKey='Id'
                        />
                    </div>
                )}
            </div>
        );
    };
    return <div>{renderTable()}</div>;
};

ListItemContainer.propTypes = {
    filmData: PropsType.array,
    showAndHideModal: PropsType.any,
    searchTerm: PropsType.any,
    ControlRender: PropsType.any,
};

export default ListItemContainer;
