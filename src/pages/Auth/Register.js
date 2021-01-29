import React, { useCallback, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';

import Error from '../../components/Error';
import { registerMember } from '../../services/authService';
import { toastNotification } from '../../helpers/Toastify';
import UserContext from '../../contexts/UserContext';
import TokenContext from '../../contexts/TokenContext';
import { jsonStringify } from '../../helpers/helper';

const promotions = ['1I', '1A', '2I', '2A', '3A', '4A', '5A'];

const Register = () => {
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    const { setToken } = useContext(TokenContext);

    const query = new URLSearchParams(useLocation().search)
    const urlToken = query.get('token');

    if (!urlToken) {
        toastNotification('error', 'Le token dans le lien est incorrecte.');
        history.push('/login');
    }

    const validationSchema = Yup.object().shape({
        lastname: Yup.string().required('Le nom est obligatoire'),
        firstname: Yup.string().required('Le prénom est obligatoire'),
        password: Yup.string().required('Le mot de passe est obligatoire'),
        promotion: Yup.string().oneOf(promotions, 'La promotion n\'est pas valide').required('Promotion obligatoire')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = useCallback(({ password, lastname, firstname, promotion }, event) => {
        registerMember(urlToken, password, lastname, firstname, promotion).then(result => {
            if (result?.token) {
                setToken(result.token);
                const user = jwt_decode(result.token);
                setUser(jsonStringify(user))
                toastNotification('success', `Bienvenue sur Motorga ${user.firstname}!`);
                history.push('/');
            }
        });
    }, [urlToken, setToken, setUser, history]);

    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <Form.Group>
                            <Form.Label>Mot de passe <span className="text-danger">*</span></Form.Label>
                            <Form.Control ref={register} name="password" type="password" className={(errors.password ? ' is-invalid' : '')} />
                            <Error error={errors.password} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nom <span className="text-danger">*</span></Form.Label>
                            <Form.Control ref={register} name="lastname" type="text" className={(errors.lastname ? ' is-invalid' : '')} />
                            <Error error={errors.lastname} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prénom <span className="text-danger">*</span></Form.Label>
                            <Form.Control ref={register} name="firstname" type="text" className={(errors.firstname ? ' is-invalid' : '')} />
                            <Error error={errors.firstname} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Promotion <span className="text-danger">*</span></Form.Label>
                            <Form.Control ref={register} name="promotion" as="select" custom className={(errors.promotion  ? ' is-invalid' : '')}>
                                <option>Choisir votre promotion</option>
                                {promotions.map(promotion => (
                                    <option key={promotion}>{promotion}</option>
                                ))}
                            </Form.Control>
                            <Error error={errors.promotion} />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Créer mon compte
                            </Button>
                        </div>
                        <div className="mt-3 text-center">
                            <Link to="login" className="btn-link pr-0">Me connecter</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;