import { createContext } from 'react';

const UserContext = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    pins: [],
    currentPin: null
});

export default UserContext;
