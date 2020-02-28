import React, { useState, useContext } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import {
    AddAPhotoTwoTone as AddAPhotoIcon,
    LandscapeOutlined as LandscapeIcon,
    Clear as ClearIcon,
    SaveTwoTone as SaveIcon
} from '@material-ui/icons';
import UserContext from '../../context';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { useClient } from '../../client';

const CreatePin = ({ classes }) => {
    const client = useClient();
    const { state, dispatch } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleImageUpload = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'geopins');
        data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
            data
        );
        return response.data.url;
    };

    const handleSubmit = async ev => {
        try {
            ev.preventDefault();
            setSubmitting(true);

            const url = await handleImageUpload();
            const variables = {
                title,
                image: url,
                content,
                latitude: state.draft.latitude,
                longitude: state.draft.longitude
            };

            const { createPin } = await client.request(CREATE_PIN_MUTATION, variables);
            handleDeleteDraft();

            console.log('Pin Created:', createPin);
        } catch (error) {
            setSubmitting(false);
            console.error('Error creating pin', error);
        }
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
                    disabled={!title.trim() || !content.trim() || !image || submitting}
                    onClick={handleSubmit}
                >
                    {submitting ? 'Saving' : 'Submit'} <SaveIcon className={classes.rightIcon} />
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
