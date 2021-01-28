import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import TokenContext from '../contexts/TokenContext';
import { isLoggedIn } from '../helpers/helper';

const PublicRoute = ({ children, ...rest }) => {
    const { token } = useContext(TokenContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn(token) ? (
                    <Redirect
                        to={{
                            pathname: '/members',
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
      );
  }

export default PublicRoute;