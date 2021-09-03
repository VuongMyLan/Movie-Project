import React from 'react';
import './ListItem.css';
import PropsType from 'prop-types';
import { Popover } from 'antd';

const ListItem = ({ img, name, showAndHideModal, idnumber }) => {
    // image name btn-change btn-delete
    // console.log(showAndHideModal);

    return (
        <div className='List-item row align-items-center '>
            <div className='col-1 '>{idnumber}</div>
            <div className='col-2 img-container-admin'>
                <img alt='img-film' src={img} className='img-film' />
            </div>
            <div className='col-5 admin-name-movie  '>
                {name}
                <Popover placement='rightTop' title='detail' content='test'>
                    <i className='fas fa-info-circle info-detail'> </i>
                </Popover>
            </div>
            <div className='col-4 d-flex flex-row justify-content-around admin-contain-btn'>
                <button className='btn btn-primary admin-btn-change align-self-center'>
                    Edit
                </button>
                <button
                    onClick={showAndHideModal}
                    data-toggle='modal'
                    data-target='#exampleModal'
                    className='btn btn-danger admin-btn-delete align-self-center'
                >
                    delete
                </button>
            </div>
        </div>
    );
};

ListItem.propTypes = {
    img: PropsType.string,
    name: PropsType.string,
    showAndHideModal: PropsType.any,
    idnumber: PropsType.any,
};
export default ListItem;
