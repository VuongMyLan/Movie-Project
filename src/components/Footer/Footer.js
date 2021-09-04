import React, { Fragment } from 'react';

export default function footer() {
    return (
        <Fragment>
            <hr />
            <div className='footer text-white container'>
                <div className='row'>
                    <div className='col-3 text-right'>
                        <img
                            src='/web-logo.png'
                            style={{ height: 100, width: 100 }}
                        ></img>
                    </div>
                    <div className='col-9'>
                        <h4 className='text-dark text-left pl-0 ml-0'>
                            MONACO COMPANY LIMITED.,
                        </h4>
                        <p className='text-dark'>
                            Business registration certificate: 0303675393,
                            registered for the first time on 31/7/2008
                            <br></br>
                            issued by HCMC Department of Planning and
                            Investment.
                        </p>

                        <p className='text-dark'>
                            Address: Floor 4, Rivera Park Saigon - No. 7/28
                            Thanh Thai street, Ward 14, District 10, HCMC.
                            <br />
                            Hotline: 1900 6017
                            <br />
                            COPYRIGHT 2017 CJ CGV. All RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
