import React from 'react';

import MyCarousel from '../../components/Home/carousel/MyCarousel';

import MyTable from '../../components/Home/table/MyTable';
import HomeTemplate from '../../components/Templates/HomeTemplate/HomeTemplate';
import Advertise from '../../components/Advertise/Advertise';
import Companyinfo from '../../components/Home/Companyinfo/Companyinfo';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';

const Home = () => {
    return (
        <div>
            <HomeTemplate>
                <MyCarousel />
                {/* <MovieListContainer /> */}
                <MultipleRowSlick />
                <MyTable />
                <Advertise></Advertise>
                <Companyinfo></Companyinfo>
            </HomeTemplate>
        </div>
    );
};

export default Home;
