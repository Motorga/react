import React, { useCallback, useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BoxArrowRight, CalendarEvent, Map, People, Person } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';
import UserContext from '../contexts/UserContext';

const Header = () => {
    const history = useHistory();

    const { setToken } = useContext(TokenContext);
    const { setUser } = useContext(UserContext);

    const logout = useCallback(() => {
        setToken('');
        setUser('{}');
        history.push('/login');
    }, [setToken, setUser, history]);

    return (
        <Navbar className="shadow mb-2" collapseOnSelect expand="md" bg="light" variant="light" sticky="top">
            <Navbar.Brand>
                <img className="mr-2" src={`${process.env.PUBLIC_URL}/icon.svg`} alt="logo" width="50" height="50"></img>
                Motorga
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link className="d-flex align-items-center" onClick={() => history.push('/members')}>
                        <People size={24} className="mr-1" />Membres
                    </Nav.Link>
                    <Nav.Link className="d-flex align-items-center" onClick={() => history.push('/map')}>
                        <Map size={24} className="mr-1" />Carte
                    </Nav.Link>
                    <Nav.Link className="d-flex align-items-center" onClick={() => history.push('/events')}>
                        <CalendarEvent size={24} className="mr-1" />Sorties
                    </Nav.Link>
                    <Nav.Link className="d-flex align-items-center" onClick={() => history.push('/profile')}>
                        <Person size={24} className="mr-1" />Profil
                    </Nav.Link>
                    <Nav.Link className="d-flex align-items-center text-danger" onClick={logout}>
                        <BoxArrowRight size={24} className="mr-1" />Déconnexion
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;