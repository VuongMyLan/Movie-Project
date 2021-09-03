import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCinemaAction } from '../../redux/actions/GetCinemaAction';
import { Tabs } from 'antd';
import PropsType from 'prop-types';
import { NavLink } from 'react-router-dom';
//import _ from "lodash";
//import {NavLink} from "react-router-dom";
//render film Schedule

const FilmSchedule = ({ filmSchedule }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getCinemaAction();
        dispatch(action);
    }, []);
    const { TabPane } = Tabs;

    const renderLichChieu = () => {
        return filmSchedule?.map((htr, index) => {
            return (
                <TabPane
                    tab={
                        <div>
                            <img
                                src={htr.logo}
                                width='50'
                                height='50'
                                alt='...'
                            />
                        </div>
                    }
                    key={index}
                >
                    <Tabs tabPosition='left'>
                        {htr?.cumRapChieu?.map((cinename, index) => {
                            return (
                                <TabPane
                                    tab={
                                        <div className='d-flex flex-row mt-2 ml-0'>
                                            <div>
                                                <img
                                                    src='https://picsum.photos/50/50'
                                                    alt='...'
                                                />
                                            </div>
                                            <div className='ml-2 text-left'>
                                                <b>
                                                    <p className='my-0'>
                                                        {cinename?.tenCumRap
                                                            .length > 15
                                                            ? cinename.tenCumRap +
                                                              '...'
                                                            : cinename.tenCumRap}
                                                    </p>
                                                </b>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    <div className='row'>
                                        {cinename?.lichChieuPhim?.map(
                                            (filmSchedule, index) => {
                                                return (
                                                    <div
                                                        className='col-4 text-left mt-4 '
                                                        key={index}
                                                    >
                                                        <NavLink
                                                            to={`/checkout/${filmSchedule.maLichChieu}`}
                                                            className='showTimes'
                                                            style={{
                                                                color: 'black',
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            {' '}
                                                            {moment(
                                                                filmSchedule.ngayChieuGioChieu
                                                            ).format(
                                                                'DD/MM/YYYY'
                                                            )}{' '}
                                                            {moment(
                                                                filmSchedule.ngayChieuGioChieu
                                                            ).format('LT')}
                                                        </NavLink>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </TabPane>
            );
        });
    };

    const renderSchedule = () => {
        let groupdate = [];
        return filmSchedule?.map((htr, index) => {
            return (
                <TabPane
                    tab={
                        <div>
                            <img
                                src={htr.logo}
                                width='50'
                                height='50'
                                alt='...'
                            />
                        </div>
                    }
                    key={index}
                >
                    <Tabs tabPosition='left'>
                        {htr?.cumRapChieu?.map((cinename, index) => {
                            return (
                                <TabPane
                                    tab={
                                        <div className='d-flex flex-row mt-2 ml-0'>
                                            <div>
                                                <img
                                                    src='https://picsum.photos/50/50'
                                                    alt='...'
                                                />
                                            </div>
                                            <div className='ml-2 text-left'>
                                                <b>
                                                    <p className='my-0'>
                                                        {cinename?.tenCumRap
                                                            .length > 15
                                                            ? cinename.tenCumRap +
                                                              '...'
                                                            : cinename.tenCumRap}
                                                    </p>
                                                </b>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    <div className='row'>
                                        {cinename?.lichChieuPhim?.map(
                                            (filmSchedule, index) => {
                                                var date =
                                                    filmSchedule.ngayChieuGioChieu.split(
                                                        'T'
                                                    )[0];

                                                if (groupdate[date]) {
                                                    groupdate[date].push(
                                                        filmSchedule
                                                    );
                                                } else {
                                                    groupdate[date] = [
                                                        filmSchedule,
                                                    ];
                                                }
                                                console.log(
                                                    'groupdate',
                                                    groupdate[date]
                                                );

                                                return (
                                                    <div key={index}></div>
                                                    // <div
                                                    //     className='col-4 text-left mt-4 '
                                                    //     key={index}
                                                    // >
                                                    //     <NavLink
                                                    //         to={`/checkout/${filmSchedule.maLichChieu}`}
                                                    //         className='showTimes'
                                                    //         style={{
                                                    //             color: 'black',
                                                    //             fontWeight:
                                                    //                 'bold',
                                                    //         }}
                                                    //     >
                                                    //         {' '}
                                                    //         {moment(
                                                    //             filmSchedule.ngayChieuGioChieu
                                                    //         ).format(
                                                    //             'DD/MM/YYYY'
                                                    //         )}{' '}
                                                    //         {moment(
                                                    //             filmSchedule.ngayChieuGioChieu
                                                    //         ).format('LT')}
                                                    //     </NavLink>
                                                    // </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </TabPane>
            );
        });
    };
    return (
        <div className='container'>
            <Tabs tabPosition={'left'}>{renderLichChieu()}</Tabs>
            <Tabs tabPosition={'left'}>{renderSchedule()}</Tabs>
        </div>
    );
};

FilmSchedule.propTypes = {
    filmSchedule: PropsType.array,
};

export default FilmSchedule;
