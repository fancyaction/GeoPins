import React, { Fragment } from 'react';
import Map from '../components/Map';
import Header from '../components/Header';
import withRoot from '../withRoot';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Map />
        </Fragment>
    );
};

export default withRoot(App);
