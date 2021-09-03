import React, { Component } from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import styleSlick from './MultipleRowSlick.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Space } from 'antd';
import { useEffect } from 'react';

import { getApiFilmAction } from '../../redux/actions/FilmActions';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}
const MultipleItems = (props) => {
    const { Search } = Input;
    const { arrFilm } = useSelector((state) => state.FilmReducer);
    console.log('arrFilm', arrFilm);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getApiFilmAction();
        dispatch(action);
    }, []);
    var settings = {
        className: 'center variable-width',
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        centerPadding: '60px',
        rows: 1,
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const renderfilm = () => {
        {
            return arrFilm?.map((film, index) => {
                return (
                    <div key={index} className='my-5'>
                        <div className='card text-white bg-white movielist border-0 slick__content'>
                            <div className='movielist__content'>
                                <div
                                    style={{
                                        background: `url(${film.hinhAnh}), center, 100%,100%`,
                                    }}
                                    className='slick__content__img'
                                >
                                    <img
                                        className='card-img-top'
                                        src={film.hinhAnh}
                                        alt='...'
                                        style={{ height: '300px' }}
                                    />
                                </div>

                                <div className='movielist__button text-center'>
                                    <a
                                        className='venobox light'
                                        data-autoplay='true'
                                        data-vbtype='video'
                                        href={film.trailer}
                                    >
                                        <button className='text-dark text-center rounded-circle movielist__button__icon'>
                                            <i className='fa fa-play'></i>
                                        </button>
                                    </a>
                                </div>
                                <div className='movielist__overlay'></div>
                            </div>

                            <div className='card-body p-0 slick__cardbody'>
                                <p className='card-title text-left text-dark m-0'>
                                    <b>{film.tenPhim}</b>
                                </p>
                                <div className='row'>
                                    <div className='col-12'>
                                        <p className='card-text text-left text-dark'>
                                            Released{' '}
                                            {moment(film.ngayKhoiChieu).format(
                                                'LL'
                                            )}{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-12 text-center p-0 pt-1 cardbody__button'>
                                    <NavLink to={`detail/${film.maPhim}`}>
                                        {' '}
                                        <span className='text-center rounded '>
                                            <b>Get Ticket</b>
                                        </span>
                                        <div className='cardbody__button__liquid'></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    const onSearch = (value) => {
        const action = getApiFilmAction(value);
        dispatch(action);
    };

    const renderSearch = () => {
        return (
            <Space direction='vertical'>
                <Search placeholder='Search Films' onSearch={onSearch} />
            </Space>
        );
    };
    return (
        <div id='movielist' className='container mt-5 text-center '>
            <div>
                <button className='mr-2 buttn__allmovie'>ALL MOVIES</button>
            </div>
            <div className='nav-item mt-2'>{renderSearch()}</div>

            <Slider {...settings} className='container'>
                {renderfilm()}
            </Slider>
        </div>
    );
};

export default MultipleItems;

// SampleNextArrow.propTypes = {
//   className: PropTypes.node.isRequired,
//   style: PropTypes.node.isRequired,
//   onClick: PropTypes.node.isRequired,
// };

// SamplePrevArrow.propTypes = {
//   className: PropTypes.node,
//   style: PropTypes.node,
//   onClick: PropTypes.node,
// };
