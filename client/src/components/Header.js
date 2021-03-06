import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import UserContext from '../context';
import SignOut from '../components/Auth/Signout';

const Header = ({ classes }) => {
    const { state } = useContext(UserContext);
    const mobileSize = useMediaQuery('(max-width: 650px)');
    const { currentUser } = state;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.grow}>
                        <MapIcon className={classes.icon} />
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={mobileSize ? classes.mobile : ''}
                        >
                            GeoPins
                        </Typography>
                    </div>
                    {currentUser && (
                        <div className={classes.grow}>
                            <img className={classes.picture} src={currentUser.picture} alt={currentUser.name} />
                            <Typography
                                variant="h5"
                                color="inherit"
                                noWrap
                                className={mobileSize ? classes.mobile : ''}
                            >
                                {currentUser.name}
                            </Typography>
                        </div>
                    )}
                    <SignOut />
                </Toolbar>
            </AppBar>
        </div>
    );
};

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(1),
        color: 'green',
        fontSize: 45
    },
    mobile: {
        display: 'none'
    },
    picture: {
        height: '50px',
        borderRadius: '90%',
        marginRight: theme.spacing(2)
    }
});

export default withStyles(styles)(Header);
