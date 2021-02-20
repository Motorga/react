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
import LoadingContext from './contexts/LoadingContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Profile from './pages/Profile/index';
import Members from './pages/Members';
import Events from './pages/Events/index';
import Event from './pages/Events/Event';
import NewEvent from './pages/Events/NewEvent';
import EditEvent from './pages/Events/EditEvent';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';

const App = () => {
    const [ user, setUser ] = useState(window.localStorage.getItem('user') ?? '{}');
    const [ token, setToken ] = useState(window.localStorage.getItem('token') ?? '');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        window.localStorage.setItem('user', user);
    }, [user])

    useEffect(() => {
        window.localStorage.setItem('token', token);
    }, [token])
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <TokenContext.Provider value={{ token, setToken }}>
                <LoadingContext.Provider value={{ loading, setLoading }}>
                    <Router>
                        <Switch>
                            <PublicRoute exact path="/login">
                                <Login />
                            </PublicRoute>
                            <PublicRoute path="/register">
                                <Register />
                            </PublicRoute>
                            <PublicRoute path="/forgotPassword">
                                <ForgotPassword />
                            </PublicRoute>
                            <PublicRoute path="/resetPassword">
                                <ResetPassword />
                            </PublicRoute>
                            <PrivateRoute exact path="/members">
                                <Members />
                            </PrivateRoute>
                            <PrivateRoute exact path="/events">
                                <Events />
                            </PrivateRoute>
                            <PrivateRoute exact path="/events/new">
                                <NewEvent />
                            </PrivateRoute>
                            <PrivateRoute path="/events/:id/edit">
                                <EditEvent />
                            </PrivateRoute>
                            <PrivateRoute path="/events/:id">
                                <Event />
                            </PrivateRoute>
                            <PrivateRoute exact path="/profile">
                                <Profile />
                            </PrivateRoute>
                            <Route path="*">
                                <Redirect to="/members" />
                            </Route>
                        </Switch>
                    </Router>
                </LoadingContext.Provider>
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}

export default App;
