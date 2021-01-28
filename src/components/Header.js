import React, { useCallback, useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';
import UserContext from '../contexts/UserContext';

const Header = () => {
    const history = useHistory();

    const { setToken } = useContext(TokenContext);
    const { setUser } = useContext(UserContext);

    const logout = useCallback(() => {
        setToken('');
        setUser({});
        history.push('/login');
    }, []);

    return (
        <Navbar collapseOnSelect expand="md" bg="light" variant="light" sticky="top">
            <Navbar.Brand>Motorga</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link onClick={() => history.push('/members')}>Membres</Nav.Link>
                    <Nav.Link onClick={() => history.push('/profil')}>Profil</Nav.Link>
                    <Nav.Link onClick={logout} className="text-danger">Déconnexion</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;