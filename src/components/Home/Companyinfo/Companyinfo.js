import React, { Fragment } from 'react';
import './Companyinfo.css';

export default function Companyinfo() {
    return (
        <Fragment>
            <hr></hr>
            <div className='container my-5 companyinfo'>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <h3>Monaco Vietnam</h3>
                        <p>
                            <a> About Us</a>
                        </p>
                        <p>
                            <a> Career</a>
                        </p>
                        <p>
                            <a> Contact Us</a>
                        </p>
                    </div>
                    <div className='col-12 col-md-4'>
                        <h3>Terms and Conditions</h3>
                        <p>
                            <a> Terms of Website use</a>
                        </p>
                        <p>
                            <a> Payment Policy</a>
                        </p>
                        <p>
                            <a> Privacy Policy</a>
                        </p>
                    </div>
                    <div className='col-12 col-md-3'>
                        <h3> Customer service</h3>
                        <p>
                            <a> Hotline: 1900 2020</a>
                        </p>
                        <p>
                            <a>
                                {' '}
                                Working hours: 8:00 - 22:00 (Monday to Sunday)
                            </a>
                        </p>
                        <p>
                            <a> Email support: monacocs@gmail.com</a>
                        </p>
                    </div>
                    <div className='col-12 col-md-2 companyinfo__social'>
                        <h3>Follow us</h3>
                        <p className='companyinfo__social__fb'>
                            <a>
                                {' '}
                                <i className='fab fa-facebook'></i> mocanocinema
                            </a>
                        </p>
                        <p className='companyinfo__social__ig'>
                            <a>
                                {' '}
                                <i className='fab fa-instagram'></i>{' '}
                                mocanocinema
                            </a>
                        </p>
                        <p className='companyinfo__social__tw'>
                            <a>
                                {' '}
                                <i className='fab fa-twitter'></i> mocanocinema
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
