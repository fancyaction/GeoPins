import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import {
    AddAPhotoTwoTone as AddAPhotoIcon,
    LandscapeOutlined as LandscapeIcon,
    Clear as ClearIcon,
    SaveTwoTone as SaveIcon
} from '@material-ui/icons';
import UserContext from '../../context';

const CreatePin = ({ classes }) => {
    const { dispatch } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = ev => {
        ev.preventDefault();
        console.log({ title, image, content });
    };

    const handleDeleteDraft = () => {
        setTitle('');
        setImage('');
        setContent('');
        dispatch({ type: 'DELETE_DRAFT' });
    };

    return (
        <form className={classes.form}>
            <Typography className={classes.alignCenter} component="h2" variant="h4" color="secondary">
                <LandscapeIcon className={classes.iconLarge} /> Pin Location
            </Typography>
            <div>
                <TextField
                    name="title"
                    label="title"
                    placeholder="Insert pin title"
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input
                    accept="image/*"
                    id="image"
                    type="file"
                    className={classes.input}
                    onChange={ev => setImage(ev.target.files[0])}
                />
                <label htmlFor="image">
                    <Button
                        style={{ color: image && 'green' }}
                        component="span"
                        size="small"
                        className={classes.button}
                    >
                        <AddAPhotoIcon />
                    </Button>
                </label>
            </div>
            <div className={classes.contentField}>
                <TextField
                    name="content"
                    label="content"
                    multiline
                    rows="6"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    onChange={ev => setContent(ev.target.value)}
                />
            </div>
            <div>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleDeleteDraft}>
                    <ClearIcon className={classes.leftIcon} /> Discard
                </Button>
                <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    disabled={!title.trim() || !content.trim() || !image}
                    onClick={handleSubmit}
                >
                    Submit <SaveIcon className={classes.rightIcon} />
                </Button>
            </div>
        </form>
    );
};

const styles = theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: theme.spacing.unit
    },
    contentField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%'
    },
    input: {
        display: 'none'
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    iconLarge: {
        fontSize: 40,
        marginRight: theme.spacing.unit
    },
    leftIcon: {
        fontSize: 20,
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        fontSize: 20,
        marginLeft: theme.spacing.unit
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        marginLeft: 0
    }
});

export default withStyles(styles)(CreatePin);
