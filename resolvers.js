const { AuthenticationError } = require('apollo-server');

const user = {
    _id: '1',
    name: 'Allistair',
    email: 'test@test.com',
    picture: 'https//cloudinary.com/test'
};

const authenticated = next => (root, args, ctx, info) => {
    if (!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in!');
    }

    return next();
};

module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser)
    }
};
