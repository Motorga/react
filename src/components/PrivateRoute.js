import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import TokenContext from '../contexts/TokenContext';
import UserContext from '../contexts/UserContext';
import { isLoggedIn } from '../helpers/helper';
import Header from './Header';
import Loader from './Loader';

const PrivateRoute = ({ children, ...rest }) => {
    const { token, setToken } = useContext(TokenContext);
    const { setUser } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!isLoggedIn(token)) {
                    setToken('');
                    setUser('{}');

                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    )
                }

                return (
                    <>
                        <Loader />
                        <Header />
                        {children}
                    </>
                )
            }}
        />
    )
}

export default PrivateRoute;