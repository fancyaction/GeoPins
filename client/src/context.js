import { createContext } from 'react';

const UserContext = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    pins: []
});

export default UserContext;
