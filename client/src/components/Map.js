import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import UserContext from '../context';
import PinIcon from './PinIcon';
import Blog from './Blog';
import { useClient } from '../client';
import { GET_PINS_QUERY } from '../graphql/queries';
import { DELETE_PIN_MUTATION } from '../graphql/mutations';

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
};

const Map = ({ classes }) => {
    const client = useClient();
    const { state, dispatch } = useContext(UserContext);
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        const getPins = async () => {
            const { getPins } = await client.request(GET_PINS_QUERY);
            dispatch({ type: 'GET_PINS', payload: getPins });
        };
        getPins();
    }, [state.pins]);

    useEffect(() => {
        const getUserPosition = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(posiition => {
                    const { latitude, longitude } = posiition.coords;
                    setViewport(prevViewport => ({ ...prevViewport, latitude, longitude }));
                    setUserPosition({ latitude, longitude });
                });
            }
        };

        getUserPosition();
    }, []);

    const handleMapClick = ({ lngLat, leftButton }) => {
        if (!leftButton) {
            return;
        }
        if (!state.draft) {
            dispatch({ type: 'CREATE_DRAFT' });
        }

        const [longitude, latitude] = lngLat;

        dispatch({ type: 'UPDATE_DRAFT_LOCATION', payload: { longitude, latitude } });
    };

    const highlightNewPin = pin => {
        const isNewPin = differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;

        return isNewPin ? 'limegreen' : 'darkblue';
    };

    const handleSelect = pin => {
        setPopup(pin);
        dispatch({ type: 'SET_PIN', payload: pin });
    };

    const isAuthUser = () => state.currentUser._id === popup.author._id;

    const handleDeletePin = async pin => {
        const variables = { pinId: pin._id };
        const { deletePin } = await client.request(DELETE_PIN_MUTATION, variables);

        dispatch({ type: 'DELETE_PIN', payload: deletePin });
        setPopup(null);
    };

    return (
        <div className={classes.root}>
            <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onViewportChange={newViewport => setViewport(newViewport)}
                onClick={handleMapClick}
                {...viewport}
            >
                <div className={classes.navigationControl}>
                    <NavigationControl onViewportChange={newViewport => setViewport(newViewport)} />
                </div>
                {userPosition && (
                    <Marker
                        latitude={userPosition.latitude}
                        longitude={userPosition.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={40} color="red" />
                    </Marker>
                )}
                {state.draft && (
                    <Marker
                        latitude={state.draft.latitude}
                        longitude={state.draft.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={40} color="blue" />
                    </Marker>
                )}
                {state.pins.map(pin => (
                    <Marker
                        key={pin._id}
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        offsetLeft={-19}
                        offsetTop={-37}
                    >
                        <PinIcon size={40} color={highlightNewPin(pin)} onClick={() => handleSelect(pin)} />
                    </Marker>
                ))}
                {popup && (
                    <Popup
                        anchor="top"
                        latitude={popup.latitude}
                        longitude={popup.longitude}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                    >
                        <img className={classes.popupImage} src={popup.image} alt={popup.title} />
                        <div className={classes.popupTab}>
                            <Typography>
                                {popup.latitude.toFixed(6)},{popup.longitude.toFixed(6)}
                            </Typography>
                            {isAuthUser() && (
                                <Button onClick={() => handleDeletePin(popup)}>
                                    <DeleteIcon className={classes.DeleteIcon} />
                                </Button>
                            )}
                        </div>
                    </Popup>
                )}
            </ReactMapGL>
            <Blog />
        </div>
    );
};

const styles = {
    root: {
        display: 'flex'
    },
    rootMobile: {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    navigationControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '1em'
    },
    deleteIcon: {
        color: 'red'
    },
    popupImage: {
        padding: '0.4em',
        height: 200,
        width: 200,
        objectFit: 'cover'
    },
    popupTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

export default withStyles(styles)(Map);
