import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import TokenContext from '../contexts/TokenContext';
import UserContext from '../contexts/UserContext';
import { isLoggedIn } from '../helpers/helper';

const AdminRoute = ({ children, ...rest }) => {
    const { token } = useContext(TokenContext);
    const { user } = useContext(UserContext);

    const { role } = JSON.parse(user);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn(token) && role === 'ADMIN' ? (
                    children
                ) : (
                    <Redirect
                        to={{
                        pathname: '/login',
                        state: { from: location }
                        }}
                    />
                )
            }
        />
      );
  }

export default AdminRoute;