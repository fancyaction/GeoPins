import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import UserContext from '../../context';
import { Typography } from '@material-ui/core';
import { ME_QUERY } from '../../graphql/queries';

const Login = ({ classes }) => {
    const { dispatch } = useContext(UserContext);

    const onFailure = err => console.err('Error logging in', err);

    const onSuccess = async googleUser => {
        try {
            const token = googleUser.getAuthResponse().id_token;
            const client = new GraphQLClient('http://localhost:4000/graphql', {
                headers: { authorization: token }
            });

            const { me } = await client.request(ME_QUERY);
            dispatch({ type: 'LOGIN_USER', payload: me });
            dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
        } catch (err) {
            onFailure(err);
        }
    };

    return (
        <div className={classes.root}>
            <Typography component="h1" variant="h3" gutterBottom noWrap style={{ color: 'rgb(66, 133, 244)' }}>
                Welcome
            </Typography>
            <GoogleLogin
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                theme="dark"
            />
        </div>
    );
};

const styles = {
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

export default withStyles(styles)(Login);
