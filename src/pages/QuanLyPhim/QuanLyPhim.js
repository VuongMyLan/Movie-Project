import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../components/Templates/AdminTemplate/AdminTemplate';
import ListItemContainer from '../../components/Admin/ListItemContainer';
import { Modal } from 'antd';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './QuanLyPhim.css';
import { useDispatch, useSelector } from 'react-redux';
import { getApiFilmAction } from '../../redux/actions/FilmActions';

const { Search } = Input;
export default function QuanLyPhim() {
    const { arrFilm } = useSelector((state) => state.FilmReducer);
    const [openModal, setOpenModal] = useState(false);
    /*const [dataFilm, setDataFilm] = useState(arrFilm);
    const [searchTerm, setSearchTerm] = useState('');*/
    const showAndHideModal = () => {
        setOpenModal(!openModal);
    };
    //get danh sach phim from api
    const dispatch = useDispatch();
    const handleSearch = (value) => {
        //dispatch
        dispatch(getApiFilmAction(value));
    };
    useEffect(() => {
        const action = getApiFilmAction();
        dispatch(action);
    }, []);
    //console.log(arrFilm);
    return (
        <div>
            <AdminTemplate>
                <>
                    <div className='text-center mb-2 dashboard__content mb-2'>
                        <div className='text-center dashboard__header'> </div>
                    </div>
                    <div className='row justify-content-between align-items-baseline addfilm__button'>
                        <NavLink to='/admin/addfilm' className='navLink col-2'>
                            <button className='btn-add mt-0'>
                                <b>Add Films</b>
                            </button>
                        </NavLink>

                        <Search
                            style={{ width: '80%' }}
                            className=' mr-sm-2 mb-5'
                            // type='search'
                            placeholder='Search'
                            aria-label='Search'
                            enterButton={<SearchOutlined />}
                            onSearch={handleSearch}
                        />
                    </div>
                    <br />
                    <ListItemContainer
                        ControlRender='FilmsControl'
                        showAndHideModal={showAndHideModal}
                        filmData={arrFilm}
                    />

                    {openModal ? <Modal /> : showAndHideModal()}
                </>
            </AdminTemplate>
        </div>
    );
}
