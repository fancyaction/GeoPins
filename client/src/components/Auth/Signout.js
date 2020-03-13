import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../context';

const Signout = ({ classes }) => {
    const { dispatch } = useContext(UserContext);
    const mobileSize = useMediaQuery('(max-width: 650px)');

    const onSignout = () => {
        dispatch({ type: 'SIGNOUT_USER' });
        console.log('SIGNED OUT USER');
    };

    return (
        <GoogleLogout
            onLogoutSuccess={onSignout}
            render={({ onClick }) => (
                <span className={classes.root} onClick={onClick}>
                    <Typography
                        variant="body1"
                        className={classes.buttonText}
                        style={{ display: mobileSize ? 'none' : 'block' }}
                    >
                        Signout
                    </Typography>
                    <ExitToAppIcon className={classes.buttonIcon} />
                </span>
            )}
        />
    );
};

const styles = {
    root: {
        cursor: 'pointer',
        display: 'flex'
    },
    buttonText: {
        color: 'orange'
    },
    buttonIcon: {
        marginLeft: '5px',
        color: 'orange'
    }
};

export default withStyles(styles)(Signout);
