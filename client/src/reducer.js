const userReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: payload
            };

        default:
            return state;
    }
};

export default userReducer;
