const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;
