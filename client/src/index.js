import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as serviceWorker from './serviceWorker';
import UserContext from './context';
import userReducer from './reducer';
import App from './pages/App';
import Splash from './pages/Splash';
import ProtectedRoute from './ProtectedRoute';

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true
    }
});

const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache()
});

const Root = () => {
    const initialState = useContext(UserContext);
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <Router>
            <ApolloProvider client={client}>
                <UserContext.Provider value={{ state, dispatch }}>
                    <Switch>
                        <ProtectedRoute exact path="/" component={App} />
                        <Route path="/login" component={Splash} />
                    </Switch>
                </UserContext.Provider>
            </ApolloProvider>
        </Router>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
