import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';

const ME_QUERY = `{
    me {
      _id
      name
      email
      picture
    }
  }
  `;

const Login = ({ classes }) => {
    const onSuccess = async googleUser => {
        const token = googleUser.getAuthResponse().id_token;
        const client = new GraphQLClient('http://localhost:4000/graphql', {
            headers: { authorization: token }
        });

        const data = await client.request(ME_QUERY);
        console.log('👀: Login -> data', data);
    };

    return <GoogleLogin clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} onSuccess={onSuccess} isSignedIn={true} />;
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
