import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import UserContext from './contexts/UserContext';
import TokenContext from './contexts/TokenContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Members from './pages/Members';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './pages/Auth/ForgotPassword';

import './assets/index.css';

const App = () => {
    const [ user, setUser ] = useState(window.localStorage.getItem('user') ?? '{}');
    const [ token, setToken ] = useState(window.localStorage.getItem('token') ?? '');

    useEffect(() => {
        window.localStorage.setItem('user', user);
    }, [user])

    useEffect(() => {
        window.localStorage.setItem('token', token);
    }, [token])
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            <TokenContext.Provider value={{token, setToken}}>
                <Router>
                    <Switch>
                        <PublicRoute exact path="/login">
                            <Login />
                        </PublicRoute>
                        <PublicRoute path="/register">
                            <Register />
                        </PublicRoute>
                        <PublicRoute exact path="/forgot-password">
                            <ForgotPassword />
                        </PublicRoute>
                        <PrivateRoute exact path="/members">
                            <Members />
                        </PrivateRoute>
                        <PrivateRoute exact path="/profil">
                            <Profile />
                        </PrivateRoute>
                        <Route path="*">
                            <Redirect to="/members" />
                        </Route>
                    </Switch>
                </Router>
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}

export default App;
