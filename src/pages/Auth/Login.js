import React, { useCallback, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';

import Error from '../../components/Error';
import authService from '../../services/authService';
import UserContext from '../../contexts/UserContext';
import TokenContext from '../../contexts/TokenContext';
import { jsonStringify } from '../../helpers/helper';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalide')
            .required('Email obligatoire'),
        password: Yup.string().required('Mot de passe obligatoire')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = useCallback(({ email, password }, event) => {
        authService.login(email, password).then((result) => {
            if (result?.token) {
                setToken(result.token);
                const user = jwt_decode(result.token);
                setUser(jsonStringify(user));
                history.push('/');
            }
        })
    }, []);

    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={register} name="email" type="text" className={(errors.email  ? ' is-invalid' : '')} />
                            <Error error={errors.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control ref={register} name="password" type="password" className={(errors.password ? ' is-invalid' : '')} />
                            <Error error={errors.password} />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Connexion
                            </Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="forgot-password" className="btn-link pr-0">Mot de passe oublié</Link>
                            <br/>
                            <small>Vous n'avez pas encore de compte?<br/>Demandez à un admin de l'association de vous en créer un!</small>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;