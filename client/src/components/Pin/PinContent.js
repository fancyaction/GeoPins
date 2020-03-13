import React, { useContext } from 'react';
import format from 'date-fns/format';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FaceIcon from '@material-ui/icons/Face';
import UserContext from '../../context';
import Comments from '../Comment/Comments';
import CreateComment from '../Comment/CreateComment';

const PinContent = ({ classes }) => {
    const { state } = useContext(UserContext);
    const { title, content, author, createdAt, comments } = state.currentPin;

    return (
        <div className={classes.root}>
            <Typography component="h2" variant="h4" color="primary" gutterBottom>
                {title}
            </Typography>
            <Typography component="h3" variant="h6" color="inherit" gutterBottom className={classes.text}>
                <FaceIcon className={classes.icon} /> {author.name}
            </Typography>
            <Typography variant="subtitle2" color="inherit" gutterBottom className={classes.text}>
                <AccessTimeIcon className={classes.icon} /> {format(Number(createdAt), 'MMM Do, YYYY')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                <AccessTimeIcon className={classes.icon} /> {content}
            </Typography>
            <CreateComment />
            {comments && <Comments comments={comments} />}
        </div>
    );
};

const styles = theme => ({
    root: {
        padding: '1em 0.5em',
        textAlign: 'center',
        width: '100%'
    },
    icon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withStyles(styles)(PinContent);
