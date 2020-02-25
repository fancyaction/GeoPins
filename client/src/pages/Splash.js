import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../components/Auth/Login';
import UserContext from '../context';

const Splash = () => {
    const { state } = useContext(UserContext);

    return state.isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;
