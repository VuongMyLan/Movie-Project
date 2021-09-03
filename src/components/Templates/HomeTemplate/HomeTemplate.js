import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import PropTypes from 'prop-types';

function HomeTemplate(props) {
    return (
        <div style={{ background: '#96c5e829' }}>
            <Navbar></Navbar>
            {props.children}
            <Footer></Footer>
        </div>
    );
}

HomeTemplate.propTypes = {
    children: PropTypes.any.isRequired,
};

export default HomeTemplate;
