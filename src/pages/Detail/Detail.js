import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeTemplate from '../../components/Templates/HomeTemplate/HomeTemplate';
import FilmDetail from '../../components/Detail/FilmDetail';

import FilmSchedule from '../../components/Detail/FilmSchedule';
import { getTimescheduleAction } from '../../redux/actions/FilmActions';
import './Detail.css';
export default function Detail(props) {
    const { filmSchedule } = useSelector((state) => state.FilmReducer);
    const {
        maPhim,
        tenPhim,
        moTa,
        danhGia,
        hinhAnh,
        ngayKhoiChieu,
        trailer,
        heThongRapChieu,
    } = filmSchedule;

    const dispatch = useDispatch();
    useEffect(() => {
        const { postId } = props.match.params;

        // const action = getApiFilmDetail(postId);
        const action = getTimescheduleAction(postId);
        dispatch(action);
    }, []);

    return (
        <HomeTemplate>
            <div className='detail__body'>
                <div
                    className='detail__body_img'
                    style={{ backgroundImage: `url(${filmSchedule.hinhAnh})` }}
                ></div>
                <div className='container detail__body__content'>
                    <FilmDetail
                        maPhim={maPhim}
                        name={tenPhim}
                        description={moTa}
                        rank={danhGia}
                        image={hinhAnh}
                        startday={ngayKhoiChieu}
                        trailer={trailer}
                        timeSchedule={heThongRapChieu}
                    />
                    <br />
                    <FilmSchedule filmSchedule={filmSchedule.heThongRapChieu} />
                    <div className='FilmDetail-trailer mt-5 film__trailer'>
                        <iframe
                            src={trailer}
                            height='100'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            title='Embedded youtube'
                        />
                    </div>
                </div>
            </div>
        </HomeTemplate>
    );
}
