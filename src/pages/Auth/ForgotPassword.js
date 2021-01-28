import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const ForgotPassword = () => {
    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form >
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Changer de mot de passe
                            </Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="login" className="btn-link pr-0">Retour à la connexion</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
} 

export default ForgotPassword;