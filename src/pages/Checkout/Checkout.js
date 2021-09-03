import React, { Fragment, useEffect } from 'react';
import HomeTemplate from '../../components/Templates/HomeTemplate/HomeTemplate';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { bookingroomAction } from '../../redux/actions/FilmActions';
import PropTypes from 'prop-types';
import { USER_LOGIN } from '../../util/setting';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import {
    UserAddOutlined,
    CheckOutlined,
    CloseOutlined,
    UserOutlined,
    SmileOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {
    BOOK_CHAIR,
    CHANGE_TAB_ACTIVE,
} from '../../redux/actions/types/FilmType';
import { bookingTicketAction } from '../../redux/actions/BookingTicketAction';
import { Tabs } from 'antd';
import { userHistoryAction } from '../../redux/actions/UserAction';
import moment from 'moment';

function Checkout(props) {
    const { theaterDetail } = useSelector((state) => state.FilmReducer);
    const { bookedChair, bookedByOthers } = useSelector(
        (state) => state.BookingTicketReducer
    );
    const { userLogin } = useSelector((state) => state.UserReducer);
    // console.log('userLogin', userLogin);
    // // console.log('theaterDetail', theaterDetail);
    // console.log('bookedChair', bookedChair);

    const dispatch = useDispatch();

    useEffect(() => {
        let maLichChieu = props.match.params.id;

        const action = bookingroomAction(maLichChieu);

        dispatch(action);
    }, []);

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('You need to Sign in to book ticket');
        return <Redirect to='/login' />;
    }
    const renderChair = () => {
        return theaterDetail.danhSachGhe?.map((chair, index) => {
            let Vip = chair.loaiGhe === 'Vip' ? 'Vip' : '';
            let classChosenChair = chair.daDat === true ? 'chosenChair' : '';
            let classBookingChair = '';
            let indexchair = bookedChair.findIndex(
                (bookingchair) => bookingchair.maGhe === chair.maGhe
            );
            if (indexchair != -1) {
                classBookingChair = 'bookingChair';
            }

            let classBookedChair = '';
            if (userLogin.taiKhoan === chair.taiKhoanNguoiDat) {
                classBookedChair = 'bookedByUser';
            }

            let classBookedByOthers = '';
            let indexOtherChair = bookedByOthers?.findIndex(
                (bookingchair) => bookingchair.maGhe === chair.maGhe
            );
            if (indexOtherChair != -1) {
                classBookedByOthers = 'bookedByOtherUsers';
            }

            return (
                <Fragment key={index}>
                    <button
                        onClick={() => {
                            const action = {
                                type: BOOK_CHAIR,
                                bookedChair: chair,
                            };
                            dispatch(action);
                        }}
                        disabled={chair.daDat || classBookedByOthers != ''}
                        className={`${Vip} ${classChosenChair} ${classBookingChair} ${classBookedChair} ${classBookedByOthers} chair text-center`}
                    >
                        {chair.daDat ? (
                            classBookedChair || classBookedByOthers != '' ? (
                                <UserAddOutlined />
                            ) : (
                                <CloseOutlined
                                    style={{
                                        marginBottom: 7.5,
                                        fontWeight: 'bold',
                                    }}
                                />
                            )
                        ) : (
                            chair.stt
                        )}
                    </button>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            );
        });
    };

    // console.log('theaterDetail', theaterDetail)

    return (
        <HomeTemplate>
            <div className='container mt-2'>
                <div className='row'>
                    <div className='col-12 mt-5'>
                        <img
                            src='https://tix.vn/app/assets/img/icons/screen.png'
                            alt='screen'
                            className='w-100'
                        />
                        <br />
                        <div className='text-center chair__content'>
                            {renderChair()}
                        </div>
                        <div className='text-center mt-5'>
                            <table className='chair__tittle m-auto '>
                                <thead>
                                    <tr>
                                        <th>
                                            <button className='chair'>
                                                <CheckOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>
                                        <th>
                                            <button className='chair Vip'>
                                                <CheckOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>
                                        <th>
                                            <button className='chair chosenChair'>
                                                <CloseOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>
                                        <th>
                                            <button className='chair bookingChair'>
                                                <CheckOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>

                                        <th>
                                            <button className='chair bookedByUser'>
                                                {' '}
                                                <UserAddOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>
                                        <th>
                                            <button className='chair bookedByOtherUsers'>
                                                {' '}
                                                <UserAddOutlined
                                                    style={{
                                                        marginBottom: 7.5,
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Available Chairs</th>
                                        <th>Vip Chairs</th>
                                        <th>Booked Chairs</th>
                                        <th>Chosen Chairs</th>
                                        <th>Booked by You</th>
                                        <th>Booked by Other Users</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-12 mt-5 thongTinPhim bg-dark text-white pt-2'>
                        <div className='row'>
                            <div className='col-6 pl-3 theater__info'>
                                <p>
                                    Movie :{' '}
                                    <b>{theaterDetail.thongTinPhim?.tenPhim}</b>
                                </p>
                                <p>
                                    Theater :{' '}
                                    <b>
                                        {theaterDetail.thongTinPhim?.tenCumRap}{' '}
                                    </b>
                                </p>
                                <p>
                                    Showtimes :{' '}
                                    <b>
                                        {theaterDetail.thongTinPhim?.gioChieu}
                                    </b>
                                </p>
                                <p className='mr-1'>
                                    Chairs :
                                    <b className='text-white'>
                                        {_.sortBy(bookedChair, (chair) =>
                                            parseInt(chair.stt)
                                        )?.map((bookingchair, index) => {
                                            return (
                                                <span
                                                    className='mr-1 ml-1'
                                                    key={index}
                                                >
                                                    {bookingchair.stt}
                                                </span>
                                            );
                                        })}
                                    </b>
                                </p>
                            </div>
                            <div className='col-6 theater__info'>
                                <p>
                                    Date :{' '}
                                    <b>
                                        {theaterDetail.thongTinPhim?.ngayChieu}
                                    </b>
                                </p>
                                <p>
                                    Screen :{' '}
                                    <b>{theaterDetail.thongTinPhim?.tenRap} </b>
                                </p>
                                <p>
                                    Total Price :{' '}
                                    <b>
                                        {bookedChair
                                            .reduce(
                                                (totalprice, chair, index) => {
                                                    return (totalprice +=
                                                        chair.giaVe);
                                                },
                                                0
                                            )
                                            .toLocaleString()}
                                    </b>
                                </p>
                                <div className='checkoutbody__button'>
                                    <a>
                                        <span
                                            className='booking__button'
                                            onClick={() => {
                                                const thongTinDatVe = {
                                                    maLichChieu:
                                                        props.match.params.id,
                                                    danhSachVe: bookedChair,
                                                    taiKhoanNguoiDung:
                                                        userLogin.taiKhoan,
                                                };
                                                console.log(
                                                    'danhSachVe',
                                                    thongTinDatVe
                                                );
                                                dispatch(
                                                    bookingTicketAction(
                                                        thongTinDatVe
                                                    )
                                                );
                                            }}
                                        >
                                            BOOK TICKET
                                        </span>
                                        <div className='checkoutbody__button__liquid'></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeTemplate>
    );
}

// Checkout.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }),
//   }),
// };

const { TabPane } = Tabs;
function callback(key) {
    // console.log(key);
}

export const BookingResult = (props) => {
    const dispatch = useDispatch();
    const { userHistory } = useSelector((state) => state.UserReducer);
    const { userLogin } = useSelector((state) => state.UserReducer);
    console.log('userLogin', userLogin.taiKhoan);
    console.log('userHistory', userHistory);
    useEffect(() => {
        const action = userHistoryAction(userLogin);
        dispatch(action);
    }, []);

    const renderTicket = () => {
        return userHistory?.thongTinDatVe?.map((info, index) => {
            let seat = _.first(info.danhSachGhe);
            return (
                <div
                    className='col-12 col-md-4 bookinghistory__content'
                    key={index}
                >
                    <div className='card my-2' style={{ width: '18rem' }}>
                        <img
                            src='https://picsum.photos/2001/200'
                            className='card-img-top'
                            alt='...'
                        />
                        <div className='card-body'>
                            <h5 className='card-title text-danger'>
                                {info.tenPhim}
                            </h5>
                            <p className='card-text'>
                                Booked Date :{' '}
                                <b>{moment(info.ngayDat).format('lll')}</b>
                            </p>
                            <div>
                                Cineme :{' '}
                                <b>
                                    {seat.tenHeThongRap} - {seat.maHeThongRap}
                                </b>
                                <p>
                                    Screen: <b>{seat.tenCumRap}</b>
                                </p>
                                <p>
                                    {' '}
                                    Chair Number :
                                    <b>
                                        {' '}
                                        {info.danhSachGhe?.map(
                                            (chairNo, index) => {
                                                return (
                                                    <span
                                                        className='text-success'
                                                        key={index}
                                                    >
                                                        {chairNo.tenGhe}{' '}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className='container text-center booking__history'>
            <h2>History Booking Tickets </h2>
            <h3>Please enjoy!</h3>
            <div className='row'> {renderTicket()}</div>
        </div>
    );
};

const CheckoutTabs = (props) => {
    const { tabActive } = useSelector((state) => state.BookingTicketReducer);
    const dispatch = useDispatch();
    console.log('tabActive', tabActive);
    return (
        <div className='p-5'>
            <Tabs
                defaultActiveKey='1'
                activeKey={tabActive}
                onChange={(key) => {
                    console.log('object', key);
                    dispatch({
                        type: CHANGE_TAB_ACTIVE,
                        number: key.toString(),
                    });
                }}
            >
                <TabPane tab='01 CHAIRS SELECTION AND PAYMENT' key='1'>
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab='02 BOOKING RESULT' key='2'>
                    <BookingResult {...props} />
                </TabPane>
                <TabPane
                    tab={
                        <NavLink to='/home'>
                            <i
                                className='fa fa-home'
                                style={{ fontSize: '26px', color: '#ae4747' }}
                            ></i>
                        </NavLink>
                    }
                    key='3'
                ></TabPane>
            </Tabs>
        </div>
    );
};

export default CheckoutTabs;
