import React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiFilmAction } from '../../../redux/actions/FilmActions';
import './MovieListContainer.css';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export default function MovieListContainer() {
    const { arrFilm } = useSelector((state) => state.FilmReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const action = getApiFilmAction();
        dispatch(action);
    }, []);

    return (
        <div className='container my-5'>
            <h3 className='text-center mt-5'>Now Playing</h3>
            <div
                id='moviellistcarousel'
                className='carousel slide bg-dark mt-0'
                data-ride='carousel'
            >
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='bg-white row movie'>
                            {arrFilm
                                ?.map((film, index) => {
                                    return (
                                        <div
                                            className='col-12 col-sm-6 col-md-4 my-5 '
                                            key={index}
                                        >
                                            <div className='card text-white bg-white movielist border-0'>
                                                <div className='movielist__content'>
                                                    <div className='movielist__img'>
                                                        <img
                                                            className='card-img-top w-100 h-100 '
                                                            src={film.hinhAnh}
                                                            alt='...'
                                                        />
                                                    </div>

                                                    <div className='movielist__overlay'></div>
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
                                                </div>

                                                <div className='card-body p-0'>
                                                    <p className='card-title text-left text-dark m-0'>
                                                        <b>{film.tenPhim}</b>
                                                    </p>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <p className='card-text text-left text-dark'>
                                                                Released{' '}
                                                                {moment(
                                                                    film.ngayKhoiChieu
                                                                ).format(
                                                                    'LL'
                                                                )}{' '}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 text-left p-0 pt-1 cardbody__button'>
                                                        <NavLink
                                                            to={{
                                                                pathname: `detail/${film.maPhim}`,
                                                                state: {
                                                                    maPhim: film.maPhim,
                                                                },
                                                            }}
                                                        >
                                                            {' '}
                                                            <button className='bnt btn-danger text-center rounded cardbody__button'>
                                                                <b>
                                                                    Get Ticket
                                                                </b>
                                                            </button>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                .slice(0, 8)}
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <div className="bg-white row">
                            {movies.map((film, index) => {
                                return <div className="col-12 col-md-4 my-5" key={index}>
                                    <div className="card text-white bg-primary">
<<<<<<< HEAD
                                        <img className="card-img-top" src={film.img} alt/>
=======
                                        <img className="card-img-top" src={film.img} alt="..." />
>>>>>>> origin/master
                                        <div className="card-body">
                                            <h4 className="card-title text-center">{film.minute}</h4>
                                            <p className="card-text text-center">{film.name}</p>
                                        </div>
                                    </div>

                                </div>

                            })}


                        </div>
                    </div> */}
                </div>
                {/* <a
          className='carousel-control-prev'
          href='#moviellistcarousel'
          role='button'
          data-slide='prev'
        >
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='carousel-control-next'
          href='#moviellistcarousel'
          role='button'
          data-slide='next'
        >
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='sr-only'>Next</span>
        </a> */}
            </div>
        </div>
    );
}
