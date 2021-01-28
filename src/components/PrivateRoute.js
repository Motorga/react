import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import TokenContext from '../contexts/TokenContext';
import { isLoggedIn } from '../helpers/helper';
import Header from './Header';

const PrivateRoute = ({ children, ...rest }) => {
    const { token } = useContext(TokenContext);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isLoggedIn(token)) {
                    return (
                        <>
                            <Header />
                            {children}
                        </>
                    )
                }

                return (
                    <Redirect
                        to={{
                        pathname: '/login',
                        state: { from: location }
                        }}
                    />
                )
            }}
        />
    )
}

export default PrivateRoute;