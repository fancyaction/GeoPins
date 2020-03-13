import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExploreIcon from '@material-ui/icons/Explore';
import Typography from '@material-ui/core/Typography';

const NoContent = ({ classes }) => (
    <div className={classes.root}>
        <ExploreIcon className={classes.icon} />
        <Typography component="h2" variant="h6" align="center" color="textPrimary" gutterBottom noWrap>
            Click on map to add a pin
        </Typography>
    </div>
);

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: '80px'
    }
});

export default withStyles(styles)(NoContent);
