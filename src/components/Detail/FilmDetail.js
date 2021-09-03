import React from 'react';
import './FilmDetail.css';
import PropsType from 'prop-types';
import { Rate } from 'antd';
import moment from 'moment';
import '../../style/circle.css';
// render film img trailer description
const FilmDetail = ({
    name,
    description,
    rank,
    image,
    startday,
    trailer,
    timeSchedule,
}) => {
    return (
        <div className='d-flex  flex-column  FilmDetail-container'>
            <h1 className='text-center film__tittle'>{name}</h1>
            <h4 className='text-center film__tittle__release text-dark mt-0'>
                {' '}
                Released date: {moment(startday).format('lll')}
            </h4>
            <div className='row FilmDetail-content '>
                <div className='col-lg-4 col-md-4 col-sm-12 Detail-Image align-self-center '>
                    <img src={image} alt='detail-image' className='' />
                </div>
                <div className='col-lg-8 col-md-8 col-sm-12 Detail-Info d-flex flex-column  '>
                    <div className='row Detail-Info-mid'>
                        <div
                            className='col-lg-8 col-md-12 col-sm-12 Detail__info__des'
                            // style={{ backgroundColor: 'white' }}
                        >
                            {description}
                        </div>
                        <div className='col-lg-4 col-md-12 col-sm-12 align-self-center Detail-Info-rate'>
                            <p className='rate mb-0'>Rate</p>
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={rank / 2}
                                style={{ color: '#78ed78', fontSize: 15 }}
                            />
                            <div
                                className={`c100 p${
                                    rank * 10
                                } small rate__circle`}
                            >
                                <span>{rank * 10}%</span>
                                <div className='slice'>
                                    <div className='bar' />
                                    <div className='fill' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='Detail-Info-btn-booking align-self-center'></div>
                    <br />
                </div>
            </div>
            <br />
        </div>
    );
};
FilmDetail.propTypes = {
    name: PropsType.string,
    description: PropsType.string,
    rank: PropsType.number,
    image: PropsType.string,
    startday: PropsType.string,
    trailer: PropsType.string,
};

export default FilmDetail;
