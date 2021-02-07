import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toastNotification } from '../../helpers/Toastify';
import AppInput from '../../components/AppInput';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
    const history = useHistory();

    const query = new URLSearchParams(useLocation().search)
    const urlToken = query.get('token');

    if (!urlToken) {
        toastNotification('error', 'Le token présent dans le lien est incorrecte.');
        history.push('/login');
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Le mot de passe est obligatoire'),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = useCallback(({ password }, event) => {
        resetPassword(urlToken, password)
        .then(result => {
            if (result) {
                toastNotification('success', 'Mot de passe modifié');
                history.push('/login');
            }
        })
    }, [urlToken, history]);

    return (
        <div className="col-xs-12 col-sm-6 offset-sm-3 col-lg-4 offset-lg-4 mt-5">
            <div className="text-center">
                <h1>Motorga</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="login-card" className="card border-0">
                    <div className="mt-5">
                        <AppInput label="Mot de passe" name="password" type="password" required register={register} errors={errors} />
                        <div className="text-center">
                            <Button variant="primary" type="submit">
                                Valider mon nouveau mot de passe
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

export default ResetPassword;