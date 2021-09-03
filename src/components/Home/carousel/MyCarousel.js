import React from 'react';

import './MyCarousel.css';
import CR2 from '../../../asset/img/CR2.png';

const MyCarousel = () => {
    return (
        <div className='carousel__banner'>
            <div
                id='carouselExampleControls'
                className='carousel slide'
                data-ride='carousel'
            >
                <div className='carousel-inner'>
                    <div className='carousel-item active img-fluid'>
                        <img src={CR2} className='d-block w-100' alt='...' />
                    </div>
                    <div className='carousel-item carouselImg img-fluid'>
                        <img src={CR2} className='d-block' alt='...' />
                    </div>
                </div>
                <a
                    className='carousel-control-prev'
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='prev'
                >
                    <span
                        className='carousel-control-prev-icon'
                        aria-hidden='true'
                    />
                    <span className='sr-only'>Previous</span>
                </a>
                <a
                    className='carousel-control-next'
                    href='#carouselExampleControls'
                    role='button'
                    data-slide='next'
                >
                    <span
                        className='carousel-control-next-icon'
                        aria-hidden='true'
                    />
                    <span className='sr-only'>Next</span>
                </a>
            </div>
        </div>
    );
};

export default MyCarousel;
