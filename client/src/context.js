import { createContext } from 'react';

const UserContext = createContext({
    currentUser: null
});

export default UserContext;
