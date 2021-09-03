import React, { Fragment } from 'react';
import './Advertise.css';

export default function Advertise() {
    return (
        <Fragment>
            <hr />
            <div className='text-center advertise__title'>
                <img
                    className='text-center d-inline'
                    src='/img/Event1.jpg'
                    style={{ height: 100 }}
                />
                <br />
                <img
                    src='/img/seperation-line.png'
                    id='advertise__img'
                    style={{ height: 200, width: 420 }}
                />
            </div>
            <div
                id='carouselExampleIndicators'
                className='carousel slide mt-0'
                data-ride='carousel'
            >
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='container'>
                            <div className='row advertimg'>
                                <div className='.col-1 col-lg-3 my-1'>
                                    <img
                                        src='/img/advertise6.jpg'
                                        className='w-100'
                                    />
                                </div>
                                <div className='.col-1 col-lg-6 my-1'>
                                    <img
                                        src='/img/advertise2.jpg'
                                        className='w-100'
                                    />
                                </div>
                                <div className='.col-1 col-lg-3 my-1'>
                                    <img
                                        src='/img/advertise1.png'
                                        className='w-100'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='container'>
                            <div className='row advertimg'>
                                <div className='.col-1 col-lg-3 my-'>
                                    <img
                                        src='/img/advertise5.png'
                                        className='w-100'
                                    />
                                </div>
                                <div className='.col-1 col-lg-6 my-1'>
                                    <img
                                        src='/img/advertise3.png'
                                        className='w-100'
                                    />
                                </div>
                                <div className='.col-1 col-lg-3 my-1'>
                                    <img
                                        src='/img/advertise4.png'
                                        className='w-100'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <a
                    className='carousel-control-prev carousel__nexticon'
                    href='#carouselExampleIndicators'
                    role='button'
                    data-slide='prev'
                >
                    <span aria-hidden='true' />
                    <span className='' id='nexticon'>
                        <i className='fa fa-chevron-left'></i>
                    </span>
                </a>
                <a
                    className='carousel-control-next carousel__nexticon'
                    href='#carouselExampleIndicators'
                    role='button'
                    data-slide='next'
                >
                    <span aria-hidden='true' />
                    <span className='' id='nexticon'>
                        <i className='fa fa-chevron-right'></i>
                    </span>
                </a>
            </div>
        </Fragment>
    );
}
