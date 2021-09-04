import React from 'react';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MyTable.css';
import { getCinemaAction } from '../../../redux/actions/GetCinemaAction';
import PropsType from 'prop-types';

// import moment from 'moment';
import { Tabs } from 'antd';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

export default function MyTable() {
    const { cinemaData } = useSelector((state) => state.CinemaReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getCinemaAction();
        dispatch(action);
    }, []);

    //console.log(filmSchedule);
    const { TabPane } = Tabs;

    const renderHeThongRap = () => {
        return cinemaData?.map((htr, index) => {
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
                    <Tabs tabPosition='top'>
                        {htr.lstCumRap?.map((cinename, index) => {
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
                                                        {cinename.tenCumRap
                                                            .length > 15
                                                            ? cinename.tenCumRap +
                                                              '...'
                                                            : cinename.tenCumRap}
                                                    </p>
                                                </b>
                                                <p>
                                                    {cinename.diaChi.length > 15
                                                        ? cinename.diaChi.substr(
                                                              0,
                                                              40
                                                          ) + '...'
                                                        : cinename.diaChi}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    key={index}
                                >
                                    <div className='filmbooking__content'>
                                        {_.sortBy(cinename.danhSachPhim, [
                                            (film) =>
                                                film.tenPhim.toLowerCase(),
                                        ])?.map((film, index) => {
                                            return (
                                                <div
                                                    className='row '
                                                    key={index}
                                                >
                                                    <div className='col-3 mt-2'>
                                                        <img
                                                            src={film.hinhAnh}
                                                            style={{
                                                                height: 50,
                                                                width: 50,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='col-4 mt-2'>
                                                        <h6 className='display-7'>
                                                            {film.tenPhim}
                                                        </h6>
                                                    </div>
                                                    <div className='col-4 mt-2 button__content'>
                                                        <NavLink
                                                            to={{
                                                                pathname: `detail/${film.maPhim}`,
                                                                state: {
                                                                    maPhim: film.maPhim,
                                                                    theaterName:
                                                                        cinename.tenCumRap,
                                                                    address:
                                                                        cinename.diaChi,
                                                                    cinemaCode:
                                                                        htr.maHeThongRap,
                                                                },
                                                            }}
                                                        >
                                                            <div className='button__getticket'>
                                                                <div className='button__getticket__effect'>
                                                                    Get Ticket
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            );
                                        })}
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
        <div className='container' id='myTable'>
            <Tabs tabPosition={'left'}>{renderHeThongRap()}</Tabs>
        </div>
    );
}

MyTable.propTypes = {
    filmSchedule: PropsType.array,
};

/*=======
  const { cinemaData } = useSelector((state) => state.CinemaReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getCinemaAction();
    dispatch(action);
  }, []);

  console.log('cinemaData', cinemaData);
  const { TabPane } = Tabs;

  const renderHeThongRap = () => {
    return cinemaData?.map((htr, index) => {
      return (
        <TabPane
          tab={
            <div>
              <img src={htr.logo} width='50' height='50' alt='...' />
            </div>
          }
          key={index}
        >
          <Tabs tabPosition='left'>
            {htr.lstCumRap?.map((cinename, index) => {
              return (
                <TabPane
                  tab={
                    <div className='d-flex flex-row mt-2 ml-0'>
                      <div>
                        <img src='https://picsum.photos/50/50' alt='...' />
                      </div>
                      <div className='ml-2 text-left'>
                        <b>
                          <p className='my-0'>
                            {cinename.tenCumRap.length > 15
                              ? cinename.tenCumRap + '...'
                              : cinename.tenCumRap}
                          </p>
                        </b>
                        <p>
                          {cinename.diaChi.length > 15
                            ? cinename.diaChi.substr(0, 40) + '...'
                            : cinename.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  <div className='filmbooking__content'>
                    {_.sortBy(cinename.danhSachPhim, (film) =>
                      film.tenPhim.toLowerCase()
                    )?.map((film, index) => {
                      return (
                        <div className='row' key={index}>
                          <div className='col-2 mt-2'>
                            <img
                              src={film.hinhAnh}
                              style={{
                                height: 50,
                                width: 50,
                              }}
                            />
                          </div>
                          <div className='col-5 mt-2'>
                            <h6 className='display-7'>{film.tenPhim}</h6>
                          </div>
                          <div className='col-5 mt-2'>
                            <NavLink to={`detail/${film.maPhim}`}>
                              {' '}
                              <button className='btn btn-danger'>
                                Get Ticket
                              </button>
                            </NavLink>
                          </div>
                        </div>
                      );
                    })}
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
      <Tabs tabPosition={'left'}>{renderHeThongRap()}</Tabs>
    </div>
  );
}

>>>>>>> origin/master*/
//  export default function MyTable() {
//     const { TabPane } = Tabs;
//     const renderHeThongRap = () => {
//         return  <Fragment>
//         <TabPane tab="Tab 1" key="1">
//         Content of Tab 1
//       </TabPane>
//       <TabPane tab="Tab 2" key="2">
//         Content of Tab 2
//       </TabPane>
//       <TabPane tab="Tab 3" key="3">
//         Content of Tab 3
//       </TabPane>
//       </Fragment>
//     }

//      return (
//          <div className="container my-5">

//         <Tabs tabPosition={'left'}>
//         {renderHeThongRap()}
//           </Tabs>
//       </div>
//      )
//  }
