const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const verifyAuthToken = async token => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });

        return ticket.getPayload();
    } catch (err) {
        console.error(`Error verifying auth token`, err);
    }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = ({ name, email, picture }) => {
    const newUser = { name, email, picture };
    return new User(newUser).save();
};

exports.findOrCreateUser = async token => {
    const googleUser = await verifyAuthToken(token);
    const user = await checkIfUserExists(googleUser.email);
    return user || createNewUser(googleUser);
};
