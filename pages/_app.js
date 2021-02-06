import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import wrapper from '../sotre/configureStore';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <title>HamaHama</title>
            </Head>
            <Component className="h-full" />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);